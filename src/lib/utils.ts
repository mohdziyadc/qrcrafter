import { DynamicContact } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { resend } from "./resend";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import { SendVerificationRequestParams } from "next-auth/providers/email";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBase64UUID() {
  const uuid = uuidv4();
  //shorten the UUID
  const uuidUndecorated = uuid.replace("-", "");
  const base64Uuid = Buffer.from(uuidUndecorated, "hex").toString("base64");
  return base64Uuid;
}

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url } = params;
  const { host } = new URL(url);

  try {
    console.log("To Email: " + identifier);
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host }),
    });
    console.log(`Resend Data: ${JSON.stringify(data)}`);
  } catch (e) {
    throw new Error("Failed to send the verification email " + e);
  }
}

function text({ url, host }: any) {
  return `Sign in to ${host}\n${url}\n\n`;
}
