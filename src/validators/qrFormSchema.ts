import * as z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const urlFormSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
});

export const multiUrlFormSchema = z.object({
  urls: z.array(z.string().url({ message: "Invalid URL" })),
  titles: z.array(z.string().min(1, { message: "Invalid Title" })),
});

export const freeTextFormSchema = z.object({
  text: z.string().refine((str) => str.length >= 32, {
    message:
      "For the data you have entered, a Dynamic QR Code would be smaller and easier to scan.",
  }),
});

export const contactFormSchema = z.object({
  first_name: z.string().min(1, { message: "Enter a first name" }),
  last_name: z.string().min(1, { message: "Enter a last name" }),
  organisation: z.string().min(1, { message: "Enter an organisation name" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone_number: z.string().regex(phoneRegex, "Invalid Number"),
});
