import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    const { uniqueToken } = await req.json();
    const qrCode = await prismaClient.aiContactQr.findUnique({
      where: {
        uniqueToken: uniqueToken,
      },
    });
    if (qrCode) {
      await prismaClient.qRCodeAnalytics.delete({
        where: {
          id: qrCode.qrCodeAnalyticsId,
        },
      });
    } else {
      return new NextResponse("[NO QR CODE FOUND]", { status: 404 });
    }
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
