import { urlFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { url } = urlFormSchema.parse(body);
    const uuid = uuidv4();
    //shorten the uuid
    const uuidUndecorated = uuid.replace("-", "");
    const base64uuid = Buffer.from(uuidUndecorated, "hex").toString("base64");
    console.log(base64uuid);
    const generateQr = await QRCode.toDataURL(
      `http://localhost:3000/${base64uuid}`,
      {
        errorCorrectionLevel: "M",
        rendererOpts: {
          quality: 1,
        },
      }
    );
    return NextResponse.json({ uuid, qrCode: generateQr, url });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR]" + error, { status: 500 });
  }
}
