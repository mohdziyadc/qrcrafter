import {
  aiContactFormSchema,
  aiFreeTextFormSchema,
  aiMultiUrlFormSchema,
  aiUrlFormSchema,
} from "@/validators/qrFormSchema";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getBase64UUID } from "@/lib/utils";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { qrType } = body;

    const base64Uuid = getBase64UUID();
    const encodedUuid = encodeURIComponent(base64Uuid);

    let qrCode: string;
    switch (qrType) {
      case "url":
        qrCode = await getUrlQrCode(body, encodedUuid);
      case "multi_url":
        qrCode = await getMultiUrlQrCode(body, encodedUuid);
      case "free_text":
        qrCode = await getFreeTextQrCode(body, encodedUuid);
      case "contact":
        qrCode = await getContactQrCode(body, encodedUuid);
      default:
        qrCode = await getUrlQrCode(body, encodedUuid);
    }

    return NextResponse.json({ qrCode: qrCode }, { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}

async function getUrlQrCode(body: any, encodedUuid: string): Promise<string> {
  return QRCode.toDataURL(`http://localhost:3000/api/redirect/${encodedUuid}`, {
    errorCorrectionLevel: "M",
    rendererOpts: {
      quality: 1,
    },
  });
}

async function getMultiUrlQrCode(
  body: any,
  encodeUuid: string
): Promise<string> {
  return QRCode.toDataURL(
    `http://localhost:3000/dynamicmultiqr/${encodeUuid}`,
    {
      rendererOpts: {
        quality: 1,
      },
      errorCorrectionLevel: "M",
    }
  );
}

async function getFreeTextQrCode(
  body: any,
  encodedUuid: string
): Promise<string> {
  return QRCode.toDataURL(
    `http://localhost:3000/dynamicfreetext/${encodedUuid}`,
    {
      errorCorrectionLevel: "M",
      rendererOpts: {
        quality: 1,
      },
    }
  );
}

async function getContactQrCode(
  body: any,
  encodedUuid: string
): Promise<string> {
  return QRCode.toDataURL(`http:localhost:3000/dynamiccontact/${encodedUuid}`, {
    errorCorrectionLevel: "M",
    rendererOpts: {
      quality: 1,
    },
  });
}
