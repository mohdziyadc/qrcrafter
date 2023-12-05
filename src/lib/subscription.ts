import { getAuthSession } from "./auth";
import { prismaClient } from "./db";

export async function checkProSubscription() {
  const session = await getAuthSession();
  if (!session?.user) {
    return false;
  }

  const proSubscription = await prismaClient.proSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!proSubscription) {
    return false;
  }

  const isValid = proSubscription.stripePriceId;
  return !!isValid;
}
