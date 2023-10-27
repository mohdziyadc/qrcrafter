// "use server";
// import { DynamicContact } from "@prisma/client";
// import vCardsJS from "vcards-js";

// export async function generateAndDownloadVCard(contact: DynamicContact) {
//   const vCard = vCardsJS();

//   vCard.firstName = contact.firstName;
//   vCard.lastName = contact.lastName;
//   vCard.organization = contact.organisation;
//   vCard.email = contact.email;
//   vCard.homePhone = contact.phoneNumber;

//   vCard.saveToFile(`${vCard.firstName}.vcf`);
// }
