import AiFeature from "@/components/AiFeature";
import Demo from "@/components/Demo";
import Features from "@/components/features";
import Hero from "@/components/Hero";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import QRForm from "@/components/QRForm";
import UseCase from "@/components/UseCase";
import { getAuthSession } from "@/lib/auth";
import { checkProSubscription } from "@/lib/subscription";
import Image from "next/image";
import { useRef } from "react";

export default async function Home() {
  const session = await getAuthSession();
  const isPaid = await checkProSubscription();
  return (
    <>
      <LandingPage user={session?.user} isPaid={isPaid} />
    </>
  );
}
