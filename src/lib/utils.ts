import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

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

export function getBase64UUID() {
  const uuid = uuidv4();
  //shorten the UUID
  const uuidUndecorated = uuid.replace("-", "");
  return Buffer.from(uuidUndecorated, "hex").toString("base64");
}
