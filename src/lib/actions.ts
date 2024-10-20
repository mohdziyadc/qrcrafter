"use server";

import { AiContactQr, AiFreeTextQr, MulitUrlAiQr } from "@prisma/client";
import { prismaClient } from "./db";
import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

/** Get Anonymous Qr Codes */
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

/** Get List of Anonymous Qr Codes */

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

export async function getAnonAiMultiUrlList() {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return {
        success: false,
        message: "No Anonymous user found",
        qrCodes: [],
      };
    }
    const qrCodes = await prismaClient.anonymousMultiUrlQr.findMany({
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
  } catch (error) {
    console.error("[SERVOR ERROR]", error);
    return {
      success: false,
      message: `An invalid error occured: ${error} `,
      qrCodes: [],
    };
  }
}

export async function getAnonAiContactList() {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return {
        success: false,
        message: "No Anonymous user found",
        qrCodes: [],
      };
    }
    const qrCodes = await prismaClient.anonymousContactQr.findMany({
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
  } catch (error) {
    return {
      success: false,
      message: `An invalid error occured: ${error} `,
      qrCodes: [],
    };
  }
}

export async function getAnonAiFreetextList() {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return {
        success: false,
        message: "No Anonymous user found",
        qrCodes: [],
      };
    }
    const qrCodes = await prismaClient.anonymousFreetextQr.findMany({
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
  } catch (error) {
    return {
      success: false,
      message: `An invalid error occured: ${error} `,
      qrCodes: [],
    };
  }
}

/** Update Anonymous Qr Codes */
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
        updatedAt: new Date(),
      },
    });
    return { success: true, message: "QR code updated" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return { success: false, message: "An error occured during the process." };
  }
}

export async function updateAnonAiMultiUrlCode(payload: {
  uniqueToken: string;
  name: string;
  urls: string[];
  titles: string[];
}) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonymous user found" };
    }

    await prismaClient.anonymousMultiUrlQr.update({
      where: {
        uniqueToken: payload.uniqueToken,
      },
      data: {
        name: payload.name,
        urls: payload.urls,
        titles: payload.titles,
        updatedAt: new Date(),
      },
    });

    return { success: true, message: "QR code updated" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return {
      success: false,
      message: `Process failed with an error ${error}`,
    };
  }
}

export async function updateAnonAiContactQr(payload: {
  uniqueToken: string;
  name: string;
  user_first_name: string;
  user_last_name: string;
  user_organisation: string;
  user_email: string;
  user_phone_number: string;
}) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonymous user found" };
    }
    await prismaClient.anonymousContactQr.update({
      where: {
        uniqueToken: payload.uniqueToken,
      },
      data: {
        name: payload.name,
        first_name: payload.user_first_name,
        last_name: payload.user_last_name,
        email: payload.user_email,
        organisation: payload.user_organisation,
        phone_number: payload.user_phone_number,
        updatedAt: new Date(),
      },
    });
    return { success: true, message: "QR code updated" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return {
      success: false,
      message: `Process failed with an error ${error}`,
    };
  }
}

export async function updateAnonAiFreetextQr(payload: {
  uniqueToken: string;
  name: string;
  freeText: string;
}) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonymous user found" };
    }
    await prismaClient.anonymousFreetextQr.update({
      where: {
        uniqueToken: payload.uniqueToken,
      },
      data: {
        name: payload.name,
        free_text: payload.freeText,
        updatedAt: new Date(),
      },
    });
    return {
      success: true,
      message: "QR code updated",
    };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return {
      success: false,
      message: `Process failed with an error ${error}`,
    };
  }
}

/** Delete Anonymous Qr Codes */
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

export async function deleteAnonAiMultiUrlQr(uniqueToken: string) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonymous user found" };
    }
    await prismaClient.anonymousMultiUrlQr.delete({
      where: {
        uniqueToken: uniqueToken,
      },
    });
    return { success: true, message: "DELETED THIS SHIT" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return {
      success: false,
      message: `Process failed with the error ${error}`,
    };
  }
}

export async function deleteAnonAiContactQr(uniqueToken: string) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonymous user found" };
    }
    await prismaClient.anonymousContactQr.delete({
      where: {
        uniqueToken: uniqueToken,
      },
    });
    return { success: true, message: "DELETED THIS SHIT" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return {
      success: false,
      message: `Process failed with the error ${error}`,
    };
  }
}

export async function deleteAnonAiFreetextQr(uniqueToken: string) {
  try {
    const anonUser = await getAnonymousUser();
    if (!anonUser) {
      return { success: false, message: "No Anonymous user found" };
    }
    await prismaClient.anonymousFreetextQr.delete({
      where: {
        uniqueToken: uniqueToken,
      },
    });
    return { success: true, message: "DELETED THIS SHIT" };
  } catch (error) {
    console.log("[SERVOR ERROR] " + error);
    return {
      success: false,
      message: `Process failed with the error ${error}`,
    };
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
