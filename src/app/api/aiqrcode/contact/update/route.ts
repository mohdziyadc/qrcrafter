import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { aiContactFormSchema } from "@/validators/qrFormSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }
    const body = await req.json();
    const {
      first_name,
      last_name,
      organisation,
      email,
      phone_number,
      uniqueToken,
    } = body;
    await prismaClient.aiContactQr.update({
      where: {
        uniqueToken: uniqueToken,
      },
      data: {
        first_name: first_name,
        last_name: last_name,
        organisation: organisation,
        email: email,
        phone_number: phone_number,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
