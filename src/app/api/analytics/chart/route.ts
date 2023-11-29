import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    const chartData = await prismaClient.qRCodeAnalytics.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        scanCount: "desc",
      },
      take: 10,
    });
    return NextResponse.json({ chartData }, { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
