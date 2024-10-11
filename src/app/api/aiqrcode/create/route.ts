import {
  aiContactFormSchema,
  aiFreeTextFormSchema,
  aiMultiUrlFormSchema,
  aiUrlFormSchema,
} from "@/validators/qrFormSchema";
import { NextRequest, NextResponse } from "next/server";
import { getBase64UUID } from "@/lib/utils";
import QRCode from "qrcode";
import {
  AiContactResponse,
  AiFreeTextResponse,
  AiMultiUrlResponse,
  AiUrlResponse,
} from "@/lib/types";
import { replicateClient } from "@/lib/replicate";
import { prismaClient } from "@/lib/db";
import { error } from "console";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { qrType, browserFingerprint } = body;

    const token = getBase64UUID();
    const encodedToken = encodeURIComponent(token);

    let anonymousUser = await prismaClient.anonymousUser.findUnique({
      where: {
        browserFingerprint: browserFingerprint,
      },
    });

    if (!anonymousUser) {
      anonymousUser = await prismaClient.anonymousUser.create({
        data: {
          browserFingerprint: browserFingerprint,
        },
      });
    }

    // Limit to 5
    if (anonymousUser.numQrCodes >= 5) {
      return NextResponse.json(
        { error: "AI QR Code limit reached >= 5" },
        { status: 429 }
      );
    }

    let response:
      | AiUrlResponse
      | AiMultiUrlResponse
      | AiFreeTextResponse
      | AiContactResponse;

    switch (qrType) {
      case "url":
        response = await getUrlQrCode(body, encodedToken);
        if (response) {
          await prismaClient.anonymousURLQr.create({
            data: {
              url: response.user_url,
              image_url: response.image_url,
              name: response.name,
              anonymousUserId: anonymousUser.id,
              uniqueToken: encodedToken,
            },
          });
        }
        break;
      //must add this break statement in order to avoid multiple api calls during execution
      case "multi_url":
        response = await getMultiUrlQrCode(body, encodedToken);
        if (response) {
          await prismaClient.anonymousMultiUrlQr.create({
            data: {
              name: response.name,
              urls: response.user_urls,
              titles: response.user_titles,
              anonymousUserId: anonymousUser.id,
              uniqueToken: encodedToken,
              image_url: response.image_url,
            },
          });
        }
        break;
      case "free_text":
        response = await getFreeTextQrCode(body, encodedToken);
        if (response) {
          await prismaClient.anonymousFreetextQr.create({
            data: {
              name: response.name,
              free_text: response.user_free_text,
              image_url: response.image_url,
              anonymousUserId: anonymousUser.id,
              uniqueToken: encodedToken,
            },
          });
        }
        break;
      // case "contact":
      //   response = await getContactQrCode(body, encodedToken);
      default:
        response = await getUrlQrCode(body, encodedToken);
        return;
    }
    return NextResponse.json(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("INTERNAL SERVOR ERROR " + JSON.stringify(error));
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
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
  // const resp1: AiUrlResponse = {
  //   name: "Nilambur Teak",
  //   latency_ms: 65451,
  //   token: "d7%2FS7YNk",
  //   image_url:
  //     "https://replicate.delivery/pbxt/gRLnEqde2R31Eq4jnLXrSgqBT9gga7Ekz2CF0CTAEIyr8iyJA/seed-59570.png",
  //   user_url: "https://substack.com/",
  // };
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
    qr_conditioning_scale: 2,
    num_inference_steps: 30,
    guidance_scale: 10,
    negative_prompt:
      "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
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
): Promise<string> {
  const { prompt } = body;
  /**
   * TODO: Add name to AI Contact QR Code in schema -> zodSchema -> backend responses
   */
  return "";
}
