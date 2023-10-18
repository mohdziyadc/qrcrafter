import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { dynamicUrlQrFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { url, name } = dynamicUrlQrFormSchema.parse(body);
    const { uniqueToken } = body;

    await prismaClient.dynamicURL.update({
      where: {
        uniqueToken: uniqueToken,
      },
      data: {
        url: url,
        name: name,
      },
    });
    return new NextResponse("SUCCESS", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
