import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { replicateClient } from "@/lib/replicate";
import { QRInputRequest, QRInputResponse } from "@/lib/types";
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
    const { url, prompt } = body;
    const token = getBase64UUID();
    const encodedToken = encodeURIComponent(token);
    const startTime = performance.now();

    let imageUrl = await replicateClient.generateQRCode({
      url: `http:localhost:3000/api/redirect/ai/${encodedToken}`,
      prompt: prompt,
      qr_conditioning_scale: 2,
      num_inference_steps: 30,
      guidance_scale: 10,
      negative_prompt:
        "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
    });
    const endTime = performance.now();
    const durationMS = endTime - startTime;

    /**
     * Add a save button to create this QR code
     * Rather than saving it everytime
     *  */
    // await prismaClient.aiURLQRCode.create({
    //   data: {
    //     url: url,
    //     uniqueToken: token,
    //     image_url: imageUrl,
    //     userId: session.user.id,
    //   },
    // });

    const response: QRInputResponse = {
      image_url: imageUrl,
      id: token,
      latency_ms: Math.round(durationMS),
    };
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
