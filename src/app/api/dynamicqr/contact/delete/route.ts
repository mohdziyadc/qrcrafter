import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }

    const { uniqueToken } = await req.json();
    const qrCode = await prismaClient.dynamicContact.findUnique({
      where: {
        uniqueToken: uniqueToken,
      },
    });
    if (!qrCode) {
      return new NextResponse("[NO QR CODE FOUND]", { status: 200 });
    }
    await prismaClient.qRCodeAnalytics.delete({
      where: {
        id: qrCode.qrCodeAnalyticsId,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
