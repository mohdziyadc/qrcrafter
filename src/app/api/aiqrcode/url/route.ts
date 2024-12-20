import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { replicateClient } from "@/lib/replicate";
import { QRInputRequest, AiUrlResponse } from "@/lib/types";
import { getBase64UUID } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const validateRequest = (request: QRInputRequest) => {
  if (!request.url) {
    throw new Error("URL is required");
  }
  if (!request.prompt) {
    throw new Error("Prompt is required");
  }
};

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as QRInputRequest;
    try {
      validateRequest(body);
    } catch (error) {
      if (error instanceof Error) {
        return new NextResponse(error.message, { status: 400 });
      }
    }
    const { url, prompt, qr_name } = body;
    const token = getBase64UUID();
    const encodedToken = encodeURIComponent(token);
    const startTime = performance.now();

    let imageUrl = await replicateClient.generateQRCode({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/a/${encodedToken}`,
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
      name: qr_name,
      user_url: url,
      image_url: imageUrl,
      token: token,
      latency_ms: Math.round(durationMS),
    };
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }

    const qrCodes = await prismaClient.aiURLQRCode.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json({ qrCodes }, { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
