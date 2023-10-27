import { contactFormSchema } from "@/validators/qrFormSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import vCardJS from "vcards-js";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { first_name, last_name, organisation, email, phone_number } =
      contactFormSchema.parse(body);
    const vCard = vCardJS();

    vCard.firstName = first_name;
    vCard.lastName = last_name;
    vCard.organization = organisation;
    vCard.email = email;
    vCard.cellPhone = phone_number;

    // res.headers.set("Content-Type", 'text/vcard; name="contact.vcf"');
    // res.headers.set("Content-Disposition", 'inline; filename="contact.vcf"');
    return new NextResponse(vCard.getFormattedString(), {
      status: 200,
      headers: {
        "content-type": "text/vcard",
        "content-disposition": 'attachment; filename="contact.vcf"',
      },
    });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
