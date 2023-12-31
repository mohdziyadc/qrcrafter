import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { getBase64UUID } from "@/lib/utils";
import { contactFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { first_name, last_name, organisation, email, phone_number } =
      contactFormSchema.parse(body);
    const base64Uuid = getBase64UUID();
    const encodedUuid = encodeURIComponent(base64Uuid);

    const generateQR = await QRCode.toDataURL(
      `http:localhost:3000/dynamiccontact/${encodedUuid}`,
      {
        errorCorrectionLevel: "M",
        rendererOpts: {
          quality: 1,
        },
      }
    );

    const qrCodeAnalytics = await prismaClient.qRCodeAnalytics.create({
      data: {
        createdAt: new Date(),
        userId: session.user.id,
        qrName: first_name,
      },
    });

    await prismaClient.dynamicContact.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        organisation: organisation,
        email: email,
        phoneNumber: phone_number,
        qrCode: generateQR,
        uniqueToken: base64Uuid,
        userId: session.user.id,
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

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const qrCodes = await prismaClient.dynamicContact.findMany({
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
