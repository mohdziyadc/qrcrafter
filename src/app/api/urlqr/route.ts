import { urlFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { url } = urlFormSchema.parse(body);

    const generateQR = await QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      rendererOpts: {
        quality: 1,
      },
    });

    return NextResponse.json({ qrCode: generateQR });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
