import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prismaClient } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    return new NextResponse("[WEBHOOK ERROR]", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const customer = await stripe.customers.retrieve(
      session.customer as string
    );
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      session.id,
      { expand: ["line_items"] }
    );
    if (!session.metadata?.userId) {
      return new NextResponse("[WEBHOOK ERROR] No User ID found");
    }
    if (session.metadata.product === "QRCrafter PRO") {
      await prismaClient.proSubscription.create({
        data: {
          userId: session.metadata.userId,
          stripeCustomerId: customer.id,
          stripePriceId: sessionWithLineItems.line_items?.data[0].price?.id,
        },
      });
    }
  }
  return new NextResponse(null, { status: 200 });
}
