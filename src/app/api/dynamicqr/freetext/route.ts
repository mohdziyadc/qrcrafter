import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { getBase64UUID } from "@/lib/utils";
import { dynamicFreeTextFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name, text } = dynamicFreeTextFormSchema.parse(body);

    const base64Uuid = getBase64UUID();
    const encodedUuid = encodeURIComponent(base64Uuid);
    const generateQR = await QRCode.toDataURL(
      `${process.env.NEXT_PUBLIC_APP_URL}/dynamicfreetext/${encodedUuid}`,
      {
        errorCorrectionLevel: "M",
        rendererOpts: {
          quality: 1,
        },
      }
    );

    const qrCodeAnalytics = await prismaClient.qRCodeAnalytics.create({
      data: {
        userId: session.user.id,
        createdAt: new Date(),
        qrName: name,
      },
    });
    await prismaClient.dynamicFreeText.create({
      data: {
        name: name,
        freetext: text,
        userId: session.user.id,
        qrCode: generateQR,
        uniqueToken: base64Uuid,
        qrCodeAnalyticsId: qrCodeAnalytics.id,
      },
    });
    return NextResponse.json({ qrCode: generateQR }, { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const qrCodes = await prismaClient.dynamicFreeText.findMany({
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
