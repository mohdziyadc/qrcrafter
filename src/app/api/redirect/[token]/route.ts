import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  let redirectUrl: string;
  try {
    // const session = await getAuthSession();
    // if (!session?.user) {
    //   return new NextResponse("User Unauthorized", { status: 401 });
    // }
    const token = params.token; //decoded URI
    const dynamicUrl = await prismaClient.dynamicURL.findUnique({
      where: {
        uniqueToken: token,
      },
    });

    if (dynamicUrl?.url) {
      // console.log(dynamicUrl.url);
      redirectUrl = dynamicUrl.url;
      await prismaClient.qRCodeAnalytics.update({
        where: {
          id: dynamicUrl.qrCodeAnalyticsId,
        },
        data: {
          scanCount: {
            increment: 1,
          },
          lastScanAt: new Date(),
        },
      });
    } else {
      return new NextResponse("No URL Found", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR]" + error, { status: 500 });
  }
  if (redirectUrl) {
    redirect(redirectUrl);
  } else {
    return new NextResponse("NO REDIRECT URL FOUND", { status: 400 });
  }
}
