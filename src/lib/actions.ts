"use server";

import { MulitUrlAiQr } from "@prisma/client";
import { prismaClient } from "./db";
import { AiMultiUrlQr } from "./types";

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

export async function getAnonAiMultiUrl(uniqueToken: string) {
  return await prismaClient.anonymousMultiUrlQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
}

async function updateQrScanCount(qrcode: MulitUrlAiQr) {
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
