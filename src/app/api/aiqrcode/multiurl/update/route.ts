import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    const body = await req.json();
    const { uniqueToken, name, titles, urls } = body;
    await prismaClient.mulitUrlAiQr.update({
      where: {
        uniqueToken: uniqueToken,
      },
      data: {
        name: name,
        titles: titles,
        urls: urls,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
