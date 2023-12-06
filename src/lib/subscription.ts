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

  const isValid =
    proSubscription.stripePriceId && proSubscription.stripeCustomerId;
  return !!isValid;
}

export async function checkPlusSubscription() {
  const session = await getAuthSession();
  if (!session?.user) {
    return false;
  }

  const plusSubscription = await prismaClient.plusSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (!plusSubscription) {
    return false;
  }

  const isValid =
    plusSubscription.stripeCustomerId && plusSubscription.stripePriceId;
  return !!isValid;
}
