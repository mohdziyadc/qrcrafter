import { prismaClient } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  let redirectUrl: string;

  try {
    const uniqueToken = params.token;
    const qrCode = await prismaClient.aiURLQRCode.findUnique({
      where: {
        uniqueToken: uniqueToken,
      },
      include: {
        qrCodeAnalytics: true,
      },
    });

    const anonQrCode = await prismaClient.anonymousURLQr.findUnique({
      where: {
        uniqueToken: uniqueToken,
      },
    });
    const qrCodeFound = qrCode !== null || anonQrCode !== null;
    if (!qrCodeFound) {
      return new NextResponse("No QR code found with the token given", {
        status: 404,
      });
    }
    if (qrCode) {
      await prismaClient.qRCodeAnalytics.update({
        where: {
          id: qrCode.qrCodeAnalytics.id,
        },
        data: {
          scanCount: {
            increment: 1,
          },
          lastScanAt: new Date(),
        },
      });
    }

    if (qrCode && qrCode.url) {
      redirectUrl = qrCode.url;
    } else if (anonQrCode && anonQrCode.url) {
      redirectUrl = anonQrCode.url;
    } else {
      return new NextResponse("No URL found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
  //This is out of the try catch block bcz of the NEXT_REDIRECT error if used in try-catch
  if (redirectUrl) {
    redirect(redirectUrl);
  } else {
    return new NextResponse("No URL found", { status: 404 });
  }
}
