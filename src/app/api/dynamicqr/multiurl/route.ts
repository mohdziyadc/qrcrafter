import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { getBase64UUID } from "@/lib/utils";
import { dynamicMultiUrlFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name, titles, urls } = dynamicMultiUrlFormSchema.parse(body);

    const base64Uuid = getBase64UUID();
    const generateQR = await QRCode.toDataURL(
      `http://localhost:3000/multiqr/${base64Uuid}`,
      {
        rendererOpts: {
          quality: 1,
        },
        errorCorrectionLevel: "M",
      }
    );

    await prismaClient.dynamicMultiURL.create({
      data: {
        name: name,
        urls: urls,
        titles: titles,
        qrCode: generateQR,
        userId: session.user.id,
        uniqueToken: base64Uuid,
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
    const qrCodes = await prismaClient.dynamicMultiURL.findMany({
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
