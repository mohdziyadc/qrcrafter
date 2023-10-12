import { freeTextFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { text } = freeTextFormSchema.parse(body);
    // console.log(`TEXT: ${text}`);

    const generateQR = await QRCode.toDataURL(text, {
      errorCorrectionLevel: "M",
      rendererOpts: {
        quality: 1,
      },
    });

    return NextResponse.json({ textQr: generateQR });
  } catch (error) {
    return new NextResponse("Internal Servor Error: " + error, { status: 500 });
  }
}
