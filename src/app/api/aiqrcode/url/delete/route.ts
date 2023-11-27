import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const { uniqueToken } = await req.json();
    const qrCode = await prismaClient.aiURLQRCode.findUnique({
      where: {
        uniqueToken: uniqueToken,
      },
    });

    /**
     * The relationship b/w AiURLQRCode => QRCodeAnalytics is many to one
     * It is not possible afaik to enable cascading delete on many to one relationships
     * So, if we consider the reverse relationship, ie, QRCodeAnalytics => AiURLQRCode, then that is one to many
     * It's possible to cascade delete by mentioning onDelete property in AiURLQRCode model
     * So the deletion of QRCodeAnalytics is done below, which would in turn delete the aiUrlQrCode.
     */
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
