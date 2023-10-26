import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { dynamicFreeTextFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name, text } = dynamicFreeTextFormSchema.parse(body);
    const { uniqueToken } = body;

    await prismaClient.dynamicFreeText.update({
      where: {
        uniqueToken: uniqueToken,
      },
      data: {
        name: name,
        freetext: text,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVER ERROR] " + error, {
      status: 500,
    });
  }
}
