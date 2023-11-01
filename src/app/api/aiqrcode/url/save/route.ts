import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type saveAiQRCode = {
  url: string;
  token: string;
  imageUrl: string;
};
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
        uniqueToken: body.token,
        image_url: body.imageUrl,
        userId: session.user.id,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
