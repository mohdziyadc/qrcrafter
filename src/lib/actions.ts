"use server";

import { AiContactQr, AiFreeTextQr, MulitUrlAiQr } from "@prisma/client";
import { prismaClient } from "./db";
import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
export async function getAiMultiUrlQrcode(uniqueToken: string) {
  const response = await prismaClient.mulitUrlAiQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
  if (response) {
    updateQrScanCount(response);
  }
  return response;
}

export async function getAiContactQrCode(uniqueToken: string) {
  const response = await prismaClient.aiContactQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });

  if (response) {
    updateQrScanCount(response);
  }
  return response;
}

export async function getAiFreetextQr(uniqueToken: string) {
  const response = await prismaClient.aiFreeTextQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
  if (response) {
    updateQrScanCount(response);
  }
  return response;
}

export async function getAnonAiMultiUrl(uniqueToken: string) {
  return await prismaClient.anonymousMultiUrlQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
}

export async function getAnonAiContactQr(uniqueToken: string) {
  return await prismaClient.anonymousContactQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
}

export async function getAnonAiFreetextQr(uniqueToken: string) {
  return await prismaClient.anonymousFreetextQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
}

export async function getAnonAiUrlList() {
  const generationToken = cookies().get("qr_token")?.value;

  if (!generationToken) {
    return { success: false, message: "No Token Found", qrCodes: [] };
  }

  try {
    const decoded = verify(generationToken, JWT_SECRET);
    const visitorId = (decoded as JwtPayload).visitorId;
    const anonUser = await prismaClient.anonymousUser.findUnique({
      where: {
        vistorId: visitorId,
      },
    });
    const qrCodes = await prismaClient.anonymousURLQr.findMany({
      where: {
        anonymousUserId: anonUser?.id,
      },
    });
    return {
      success: true,
      message: `QR Codes found for vistorId: ${anonUser?.id}`,
      qrCodes,
    };
  } catch (e) {
    console.error("Error decoding token:", e);
    return { success: false, message: "Invalid token", qrCodes: [] };
  }
}

async function updateQrScanCount(
  qrcode: MulitUrlAiQr | AiContactQr | AiFreeTextQr
) {
  await prismaClient.qRCodeAnalytics.update({
    where: {
      id: qrcode.id,
    },
    data: {
      scanCount: { increment: 1 },
      lastScanAt: new Date(),
    },
  });
}
