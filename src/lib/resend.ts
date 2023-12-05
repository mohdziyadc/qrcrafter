import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY as string;
export const resend = new Resend(`${apiKey}`);
