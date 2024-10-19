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
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return {
        success: false,
        message: "No Anonynmous user found",
        qrCodes: [],
      };
    }
    const qrCodes = await prismaClient.anonymousURLQr.findMany({
      where: {
        anonymousUserId: anonUser.id,
      },
      orderBy: {
        id: "asc",
      },
    });
    return {
      success: true,
      message: `QR Codes found for vistorId: ${anonUser.id}`,
      qrCodes,
    };
  } catch (e) {
    console.error("Error decoding token:", e);
    return { success: false, message: "Invalid token", qrCodes: [] };
  }
}

export async function updateAnonAiUrlQrcode(payload: {
  uniqueToken: string;
  url: string;
  name: string;
}) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonynomous User found" };
    }
    await prismaClient.anonymousURLQr.update({
      where: {
        uniqueToken: payload.uniqueToken,
      },
      data: {
        name: payload.name,
        url: payload.url,
      },
    });
    return { success: true, message: "QR code updated" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return { success: false, message: "An error occured during the process." };
  }
}

export async function deleteAnonAiUrlQrcode(uniqueToken: string) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonymous user found" };
    }
    await prismaClient.anonymousURLQr.delete({
      where: {
        uniqueToken: uniqueToken,
      },
    });
    return { success: true, message: "DELETED THIS SHIT" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return { success: false, message: "An unknown error occured." };
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

async function getAnonymousUser() {
  const generationToken = cookies().get("qr_token")?.value;

  if (!generationToken) {
    return;
  }
  const decoded = verify(generationToken, JWT_SECRET);
  const visitorId = (decoded as JwtPayload).visitorId;
  return await prismaClient.anonymousUser.findUnique({
    where: {
      vistorId: visitorId,
    },
  });
}
