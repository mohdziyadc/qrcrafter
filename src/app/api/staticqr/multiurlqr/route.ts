import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { multiUrlFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { urls, titles } = multiUrlFormSchema.parse(body);
    // return NextResponse.json({ urlArray: urls });
    // console.log(urls);
    const generateUserQr = await QRCode.toDataURL(
      `${process.env.NEXT_PUBLIC_APP_URL}/multiqr/${session.user.id}`,
      {
        errorCorrectionLevel: "M",
        rendererOpts: {
          quality: 1,
        },
      }
    );

    const multiQRCode = await prismaClient.multiURLCode.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    type MultiQR = {
      id: string;
      qrCode: string;
      urls: string[];
      userId: string;
      titles: string[];
    };

    let createMultiQR: MultiQR;
    if (!multiQRCode) {
      createMultiQR = await prismaClient.multiURLCode.create({
        data: {
          qrCode: generateUserQr,
          urls: urls,
          userId: session.user.id,
          titles: titles,
        },
      });
    }

    await prismaClient.multiURLCode.update({
      where: {
        id: multiQRCode?.id,
      },
      data: {
        urls: urls,
        titles: titles,
      },
    });

    // isInitial = first time calling the API

    return NextResponse.json({ multiQr: generateUserQr });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
