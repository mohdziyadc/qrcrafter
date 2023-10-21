import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAuthSession } from "./auth";
import { DynamicURL } from "@prisma/client";
import { prismaClient } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export async function getDynamicURLQrCodes() {
//   const session = await getAuthSession();
//   let qrCodes: DynamicURL[];
//   if (session?.user) {
//     qrCodes = await prismaClient.dynamicURL.findMany({
//       where: {
//         userId: session.user.id,
//       },
//     });
//     return qrCodes;
//   }
// }
