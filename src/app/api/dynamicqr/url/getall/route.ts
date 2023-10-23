import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const qrCodes = await prismaClient.dynamicURL.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json({ qrCodes }, { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR]", { status: 500 });
  }
}
