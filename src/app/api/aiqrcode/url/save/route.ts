import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { saveAiQRCode } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as saveAiQRCode;

    await prismaClient.aiURLQRCode.create({
      data: {
        url: body.url,
        name: body.name,
        uniqueToken: body.token,
        userId: session.user.id,
        image_url: body.imageUrl,
      },
    });

    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
