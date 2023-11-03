import { getAuthSession } from "@/lib/auth";
import { replicateClient } from "@/lib/replicate";
import { getBase64UUID } from "@/lib/utils";
import { aiMultiUrlFormSchema } from "@/validators/qrFormSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { urls, titles, name, prompt } = aiMultiUrlFormSchema.parse(body);
    const token = getBase64UUID();
    const encodedToken = encodeURIComponent(token);
    const startTime = performance.now();

    let imageUrl = await replicateClient.generateQRCode({
      url: `http://localhost:3000/aimulti/${encodedToken}`,
      prompt: prompt,
      qr_conditioning_scale: 2,
      num_inference_steps: 30,
      guidance_scale: 10,
      negative_prompt:
        "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry",
    });
    const endTime = performance.now();
    const durationMS = endTime - startTime;
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
