"use server";

import { AiContactQr, AiFreeTextQr, MulitUrlAiQr } from "@prisma/client";
import { prismaClient } from "./db";

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
