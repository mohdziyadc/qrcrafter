import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { AiMultiUrlResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as AiMultiUrlResponse;
    await prismaClient.mulitUrlAiQr.create({
      data: {
        name: body.name,
        urls: body.user_urls,
        titles: body.user_titles,
        userId: session.user.id,
        image_url: body.image_url,
        uniqueToken: body.token,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
