import { getAuthSession } from "@/lib/auth";
import uploadImage from "@/lib/cloudinary";
import { prismaClient } from "@/lib/db";
import { AiContactResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as AiContactResponse;
    const cloudinaryUrl = await uploadImage(body.image_url);

    const qrCodeAnalytics = await prismaClient.qRCodeAnalytics.create({
      data: {
        createdAt: new Date(),
        userId: session.user.id,
        qrName: body.user_first_name,
      },
    });
    await prismaClient.aiContactQr.create({
      data: {
        first_name: body.user_first_name,
        last_name: body.user_last_name,
        organisation: body.user_organisation,
        email: body.user_email,
        phone_number: body.user_phone_number,
        uniqueToken: body.token,
        userId: session.user.id,
        image_url: cloudinaryUrl,
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
