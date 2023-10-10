import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { multiUrlFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { urls } = multiUrlFormSchema.parse(body);
    // return NextResponse.json({ urlArray: urls });

    const generateUserQr = await QRCode.toDataURL(
      `http://localhost:3000/multiqr/${session.user.id}`,
      {
        errorCorrectionLevel: "M",
        rendererOpts: {
          quality: 1,
        },
      }
    );

    const multiURLCode = await prismaClient.multiURLCode.create({
      data: {
        qrCode: generateUserQr,
        userId: session.user.id,
      },
    });

    await prismaClient.uRL.createMany({
      data: urls.map((url) => {
        return {
          url: url,
          multiURLCodeId: multiURLCode.id,
        };
      }),
    });

    return NextResponse.json({ multiQr: generateUserQr });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
