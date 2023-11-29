import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    const recentScans = await prismaClient.qRCodeAnalytics.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        lastScanAt: "desc",
      },
      take: 5,
    });
    return NextResponse.json({ recentScans });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
