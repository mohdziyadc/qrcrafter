import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { contactFormSchema } from "@/validators/qrFormSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { first_name, last_name, organisation, email, phone_number } =
      contactFormSchema.parse(body);
    const { uniqueToken } = body;

    await prismaClient.dynamicContact.update({
      where: {
        uniqueToken: uniqueToken,
      },
      data: {
        firstName: first_name,
        lastName: last_name,
        organisation: organisation,
        email: email,
        phoneNumber: phone_number,
      },
    });
    return new NextResponse("[SUCCESS]", { status: 200 });
  } catch (error) {
    return new NextResponse("[INTERNAL SERVOR ERROR] " + error, {
      status: 500,
    });
  }
}
