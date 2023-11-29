import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { QRCodeAnalytics } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    let topQR: QRCodeAnalytics;
    try {
      topQR = await prismaClient.qRCodeAnalytics.findFirstOrThrow({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          scanCount: "desc",
        },
      });
    } catch (error) {
      return new NextResponse("[PRISMA ERROR] " + error, { status: 500 });
    }

    // if (!topQR) {
    //   return new NextResponse("[NO QR CODE FOUND]", { status: 404 });
    // }
    return NextResponse.json({ topQR }, { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
