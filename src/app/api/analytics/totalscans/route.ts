import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    const totalScans = await prismaClient.qRCodeAnalytics.aggregate({
      where: {
        userId: session.user.id,
      },
      _sum: {
        scanCount: true,
      },
    });
    return NextResponse.json({ totalScans });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
