import { getAuthSession } from "@/lib/auth";
import uploadImage from "@/lib/cloudinary";
import { prismaClient } from "@/lib/db";
import { AiFreeTextResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as AiFreeTextResponse;

    const cloudinaryUrl = await uploadImage(body.image_url);

    await prismaClient.aiFreeTextQr.create({
      data: {
        name: body.name,
        uniqueToken: body.token,
        freetext: body.user_free_text,
        image_url: cloudinaryUrl,
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
