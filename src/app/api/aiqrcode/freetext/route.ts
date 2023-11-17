import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { replicateClient } from "@/lib/replicate";
import { AiFreeTextResponse } from "@/lib/types";
import { getBase64UUID } from "@/lib/utils";
import { aiFreeTextFormSchema } from "@/validators/qrFormSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name, freetext, prompt } = aiFreeTextFormSchema.parse(body);
    const token = getBase64UUID();
    const encodedToken = encodeURIComponent(token);
    const startTime = performance.now();
    let imageUrl = await replicateClient.generateQRCode({
      url: `http://localhost:3000/aitext/${encodedToken}`,
      prompt: prompt,
      qr_conditioning_scale: 2,
      num_inference_steps: 30,
      guidance_scale: 10,
      negative_prompt:
        "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
    });
    const endTime = performance.now();
    const durationMS = endTime - startTime;
    const response: AiFreeTextResponse = {
      name: name,
      user_free_text: freetext,
      latency_ms: Math.round(durationMS),
      image_url: imageUrl,
      token: token,
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
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    const qrCodes = await prismaClient.aiFreeTextQr.findMany({
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
