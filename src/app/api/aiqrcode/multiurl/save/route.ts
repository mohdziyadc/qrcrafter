import { getAuthSession } from "@/lib/auth";
import uploadImage from "@/lib/cloudinary";
import { prismaClient } from "@/lib/db";
import { AiMultiUrlResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as AiMultiUrlResponse;

    const cloudinaryUrl = await uploadImage(body.image_url);

    const qrCodeAnalytics = await prismaClient.qRCodeAnalytics.create({
      data: {
        createdAt: new Date(),
        userId: session.user.id,
        qrName: body.name,
      },
    });

    await prismaClient.mulitUrlAiQr.create({
      data: {
        name: body.name,
        urls: body.user_urls,
        titles: body.user_titles,
        userId: session.user.id,
        image_url: cloudinaryUrl,
        uniqueToken: body.token,
        qrCodeAnalyticsId: qrCodeAnalytics.id,
      },
    });

    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
