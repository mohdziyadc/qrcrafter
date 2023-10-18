import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { dynamicUrlQrFormSchema } from "@/validators/qrFormSchema";
import { DynamicURL } from "@prisma/client";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { url, name } = dynamicUrlQrFormSchema.parse(body);
    const uuid = uuidv4();
    //shorten the uuid
    const uuidUndecorated = uuid.replace("-", "");
    const base64uuid = Buffer.from(uuidUndecorated, "hex").toString("base64");
    console.log(base64uuid);
    const generateQr = await QRCode.toDataURL(
      `http://localhost:3000/api/redirect/${base64uuid}`,
      {
        errorCorrectionLevel: "M",
        rendererOpts: {
          quality: 1,
        },
      }
    );

    await prismaClient.dynamicURL.create({
      data: {
        url: url,
        uniqueToken: base64uuid,
        userId: session.user.id,
        name: name,
        qrCode: generateQr,
      },
    });

    return NextResponse.json({ qrCode: generateQr });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR]" + error, { status: 500 });
  }
}
