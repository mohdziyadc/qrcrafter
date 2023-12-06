import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

const dashboardUrl = process.env.HOST_URL + "/dashboard";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("[UNAUTHORIZED USER]", { status: 401 });
    }

    const plusSubscription = await prismaClient.plusSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (plusSubscription && plusSubscription.stripeCustomerId) {
      const billingSession = await stripe.billingPortal.sessions.create({
        customer: plusSubscription.stripeCustomerId,
        return_url: dashboardUrl,
      });
      return NextResponse.json({ url: billingSession.url });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: dashboardUrl,
      cancel_url: process.env.HOST_URL,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: session.user.email ?? "",
      customer_creation: "always",
      line_items: [
        {
          price: process.env.QRCRAFTER_PLUS_ID as string,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        product: "QRCrafter Plus",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return new NextResponse("[STRIPE ERROR] Internal Error - " + error, {
      status: 500,
    });
  }
}
