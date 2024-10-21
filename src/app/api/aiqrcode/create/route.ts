import { NextRequest, NextResponse } from "next/server";
import { getBase64UUID } from "@/lib/utils";
import QRCode from "qrcode";
import {
  AiAnonContactResponse,
  AiContactResponse,
  AiFreeTextResponse,
  AiMultiUrlResponse,
  AiUrlResponse,
} from "@/lib/types";
import { replicateClient } from "@/lib/replicate";
import { prismaClient } from "@/lib/db";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { AnonymousUser } from "@prisma/client";
import { cookies } from "next/headers";
import { strict } from "assert";
import { r2Client } from "@/lib/r2Client";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { qrType } = body;

    let visitorId: string | undefined;
    const generationToken = cookies().get("qr_token")?.value;

    if (generationToken) {
      try {
        console.log("GenerationToken " + generationToken);
        const decoded = verify(generationToken, JWT_SECRET);
        visitorId = (decoded as JwtPayload).visitorId;
        console.log("Vistor Id from api: " + JSON.stringify(decoded));
      } catch (e) {
        console.log("Invalid Token error: " + e);
      }
    } else {
      console.log("Generation Token: " + generationToken);
    }
    if (!visitorId) {
      visitorId = Math.random().toString(36).substring(2, 9); //alphanumeric
      const newToken = sign({ visitorId }, JWT_SECRET, { expiresIn: "30d" });
      cookies().set("qr_token", newToken, {
        httpOnly: true,
        secure: true, // Change it to process.env.NODE_ENV !== "development" in prod,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      console.log("Cookie Set " + newToken);
    }
    let anonymousUser: AnonymousUser | undefined;
    try {
      anonymousUser = (await prismaClient.anonymousUser.findUnique({
        where: {
          vistorId: visitorId,
        },
      })) as AnonymousUser;
    } catch (e) {
      console.log("[PRISMA ERORR] " + e);
    }

    if (!anonymousUser) {
      anonymousUser = await prismaClient.anonymousUser.create({
        data: {
          vistorId: visitorId,
        },
      });
    }

    if (anonymousUser.numQrCodes >= 5) {
      return NextResponse.json(
        {
          allowed: false,
          message:
            "QR Code Generation limit reached. Please sign up to continue.",
        },
        { status: 429 }
      );
    }

    const token = getBase64UUID();
    const encodedToken = encodeURIComponent(token);

    let response:
      | AiUrlResponse
      | AiMultiUrlResponse
      | AiFreeTextResponse
      | AiAnonContactResponse;

    switch (qrType) {
      case "url":
        response = await getUrlQrCode(body, encodedToken);
        if (response) {
          const imageBuffer = await r2Client.urlToBuffer(response.image_url);
          const { url: r2ImageUrl } = await r2Client.uploadImage(imageBuffer);
          await prismaClient.anonymousURLQr.create({
            data: {
              url: response.user_url,
              image_url: r2ImageUrl,
              name: response.name,
              anonymousUserId: anonymousUser.id,
              uniqueToken: encodedToken,
              createdAt: new Date(),
            },
          });

          await prismaClient.anonymousUser.update({
            where: {
              vistorId: visitorId,
            },
            data: {
              numQrCodes: { increment: 1 },
              lastGeneratedAt: new Date(),
            },
          });
        }
        break;
      //must add this break statement in order to avoid multiple api calls during execution
      case "multi_url":
        response = await getMultiUrlQrCode(body, encodedToken);
        if (response) {
          const imageBuffer = await r2Client.urlToBuffer(response.image_url);
          const { url: r2ImageUrl } = await r2Client.uploadImage(imageBuffer);
          await prismaClient.anonymousMultiUrlQr.create({
            data: {
              name: response.name,
              urls: response.user_urls,
              titles: response.user_titles,
              anonymousUserId: anonymousUser.id,
              uniqueToken: encodedToken,
              image_url: r2ImageUrl,
            },
          });

          await prismaClient.anonymousUser.update({
            where: {
              vistorId: visitorId,
            },
            data: {
              numQrCodes: { increment: 1 },
              lastGeneratedAt: new Date(),
            },
          });
        }
        break;
      case "free_text":
        response = await getFreeTextQrCode(body, encodedToken);
        if (response) {
          const imageBuffer = await r2Client.urlToBuffer(response.image_url);
          const { url: r2ImageUrl } = await r2Client.uploadImage(imageBuffer);
          await prismaClient.anonymousFreetextQr.create({
            data: {
              name: response.name,
              free_text: response.user_free_text,
              image_url: r2ImageUrl,
              anonymousUserId: anonymousUser.id,
              uniqueToken: encodedToken,
            },
          });

          await prismaClient.anonymousUser.update({
            where: {
              vistorId: visitorId,
            },
            data: {
              numQrCodes: { increment: 1 },
              lastGeneratedAt: new Date(),
            },
          });
        }
        break;
      case "contact":
        response = await getContactQrCode(body, encodedToken);
        if (response) {
          const imageBuffer = await r2Client.urlToBuffer(response.image_url);
          const { url: r2ImageUrl } = await r2Client.uploadImage(imageBuffer);
          await prismaClient.anonymousContactQr.create({
            data: {
              first_name: response.user_first_name,
              name: response.name,
              last_name: response.user_last_name,
              image_url: r2ImageUrl,
              phone_number: response.user_phone_number,
              organisation: response.user_organisation,
              email: response.user_email,
              anonymousUserId: anonymousUser.id,
              uniqueToken: encodedToken,
            },
          });

          await prismaClient.anonymousUser.update({
            where: {
              vistorId: visitorId,
            },
            data: {
              numQrCodes: { increment: 1 },
              lastGeneratedAt: new Date(),
            },
          });
        }
        break;
      default:
        response = await getUrlQrCode(body, encodedToken);
        return;
    }

    return NextResponse.json(
      {
        allowed: true,
        responseData: response,
        count: anonymousUser.numQrCodes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("INTERNAL SERVOR ERROR " + JSON.stringify(error));
    return NextResponse.json("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}

async function getUrlQrCode(
  body: any,
  encodedToken: string
): Promise<AiUrlResponse> {
  const { prompt, name, url } = body;
  console.log("{BODY from getUrl} " + JSON.stringify(body));
  const startTime = performance.now();
  let imageUrl = await replicateClient.generateQRCode({
    url: `http://localhost:3000/api/a/${encodedToken}`,
    prompt: prompt,
    qr_conditioning_scale: 2,
    num_inference_steps: 30,
    guidance_scale: 10,
    negative_prompt:
      "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
  });

  const endTime = performance.now();
  const durationMS = endTime - startTime;

  const response: AiUrlResponse = {
    name: name,
    latency_ms: Math.round(durationMS),
    token: encodedToken,
    image_url: imageUrl,
    user_url: url,
  };

  return response;
}

async function getMultiUrlQrCode(
  body: any,
  encodedToken: string
): Promise<AiMultiUrlResponse> {
  const { name, prompt, urls, titles } = body;
  console.log("{BODY from getMultiUrl} " + JSON.stringify(body));

  const start = performance.now();
  let imageUrl = await replicateClient.generateQRCode({
    url: `http://localhost:3000/aimulti/${encodedToken}`,
    prompt: prompt,
    qr_conditioning_scale: 2,
    num_inference_steps: 30,
    guidance_scale: 10,
    negative_prompt:
      "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
  });
  const end = performance.now();
  const durationMS = end - start;
  const response: AiMultiUrlResponse = {
    name: name,
    image_url: imageUrl,
    user_urls: urls,
    user_titles: titles,
    latency_ms: Math.round(durationMS),
    token: encodedToken,
  };
  return response;
}

async function getFreeTextQrCode(
  body: any,
  encodedToken: string
): Promise<AiFreeTextResponse> {
  const { name, prompt, freetext } = body;
  const start = performance.now();

  let imageUrl = await replicateClient.generateQRCode({
    url: `http://localhost:3000/aitext/${encodedToken}`,
    prompt: prompt,
    qr_conditioning_scale: 2.5,
    num_inference_steps: 30,
    guidance_scale: 10,
    negative_prompt:
      "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry, distorted, out of focus, smudged, low resolution, pixelated",
  });

  const end = performance.now();
  const durationMS = end - start;
  const response: AiFreeTextResponse = {
    name: name,
    user_free_text: freetext,
    image_url: imageUrl,
    token: encodedToken,
    latency_ms: Math.round(durationMS),
  };
  return response;
}

async function getContactQrCode(
  body: any,
  encodedToken: string
): Promise<AiAnonContactResponse> {
  const {
    prompt,
    name,
    first_name,
    last_name,
    organisation,
    email,
    phone_number,
  } = body;

  const startTime = performance.now();
  let imageUrl = await replicateClient.generateQRCode({
    url: `http://localhost:3000/aicontact/${encodedToken}`,
    prompt: prompt,
    qr_conditioning_scale: 2,
    num_inference_steps: 30,
    guidance_scale: 10,
    negative_prompt:
      "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
  });

  const endTime = performance.now();
  const durationMS = endTime - startTime;
  const response: AiAnonContactResponse = {
    name: name,
    user_first_name: first_name,
    user_last_name: last_name,
    user_email: email,
    user_organisation: organisation,
    user_phone_number: phone_number,
    latency_ms: Math.round(durationMS),
    image_url: imageUrl,
    token: encodedToken,
  };
  return response;
}

/**
 * GO EAZY on the fingerprint for now. Build & Launch
 * Criteria                Same property
 * Common across browsers - IP Address
 * Same Browser (Normal + Incognito) - IP Address + User Agent
 * Different Tabs - cookies
 */

/**
 * TODO: Integrate AWS S3 instead of Cloudinary
 */
