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
  text: z.string().min(1),
});

export const contactFormSchema = z.object({
  first_name: z.string().min(1, { message: "Enter a first name" }),
  last_name: z.string().min(1, { message: "Enter a last name" }),
  organisation: z.string().min(1, { message: "Enter an organisation name" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone_number: z.string().regex(phoneRegex, "Invalid Number"),
});

export const dynamicUrlQrFormSchema = z.object({
  name: z.string().min(1, { message: "Enter a valid name" }),
  url: z.string().url({ message: "Invalid URL" }),
});

export const dynamicMultiUrlFormSchema = z.object({
  name: z.string().min(1, { message: "Enter a valid name" }),
  urls: z.array(z.string().url({ message: "Invalid URL" })),
  titles: z.array(z.string().min(1, { message: "Invalid Title" })),
});

export const dynamicFreeTextFormSchema = z.object({
  name: z.string().min(1, { message: "Enter a valid name" }),
  text: z.string().min(1),
});

export const aiUrlFormSchema = z.object({
  name: z.string().min(1),
  url: z.string().url().min(1),
  prompt: z.string().min(3).max(160),
});

export const aiMultiUrlFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character(s)" }),
  urls: z.array(z.string().url({ message: "Enter a valid URL" })),
  titles: z.array(
    z.string().min(1, { message: "Title must contain at least 1 character(s)" })
  ),
  prompt: z
    .string()
    .min(3, { message: "Prompt must contain atleast 3 character(s)" })
    .max(160, {
      message: "Prompt must not contain more than 160 character(s)",
    }),
});

export const aiFreeTextFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character(s)" }),
  freetext: z
    .string()
    .min(1, { message: "Your text must contain at least 1 character(s) " }),
  prompt: z
    .string()
    .min(3, { message: "Prompt must contain atleast 3 character(s)" })
    .max(160, {
      message: "Prompt must not contain more than 160 character(s)",
    }),
});

export const aiContactFormSchema = z.object({
  first_name: z.string().min(1, { message: "Enter a first name" }),
  last_name: z.string().min(1, { message: "Enter a last name" }),
  organisation: z.string().min(1, { message: "Enter an organisation name" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone_number: z.string().regex(phoneRegex, "Invalid Number"),
  prompt: z
    .string()
    .min(3, { message: "Prompt must contain atleast 3 character(s)" })
    .max(160, {
      message: "Prompt must not contain more than 160 character(s)",
    }),
});

export const aiAnonContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character(s)" }),
  first_name: z.string().min(1, { message: "Enter a first name" }),
  last_name: z.string().min(1, { message: "Enter a last name" }),
  organisation: z.string().min(1, { message: "Enter an organisation name" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone_number: z.string().regex(phoneRegex, "Invalid Number"),
  prompt: z
    .string()
    .min(3, { message: "Prompt must contain atleast 3 character(s)" })
    .max(160, {
      message: "Prompt must not contain more than 160 character(s)",
    }),
});

export const signInFormSchema = z.object({
  email: z.string().email(),
});
