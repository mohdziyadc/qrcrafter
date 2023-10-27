import { DynamicContact } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

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
