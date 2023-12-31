import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { aiUrlFormSchema } from "@/validators/qrFormSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { uniqueToken, url, name } = body;
    await prismaClient.aiURLQRCode.update({
      where: {
        uniqueToken: uniqueToken,
      },
      data: {
        name: name,
        url: url,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
