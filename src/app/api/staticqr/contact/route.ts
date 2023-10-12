import { contactFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { first_name, last_name, organisation, email, phone_number } =
      contactFormSchema.parse(body);

    const meCard = `MECARD:N:${first_name} ${last_name};TEL:${phone_number};EMAIL:${email};ADR:${organisation};`;

    const generateQR = await QRCode.toDataURL(meCard, {
      errorCorrectionLevel: "M",
      rendererOpts: {
        quality: 1,
      },
    });
    return NextResponse.json({ contactQr: generateQR });
  } catch (error) {
    console.log(error);
    return new NextResponse("[INTERNAL ERROR] " + error, { status: 500 });
  }
}
