"use client";
import React, { useRef } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AiFeature from "./AiFeature";
import Features from "./Features";
import UseCase from "./UseCase";
import Demo from "./Demo";
import Pricing from "./Pricing";
import Footer from "./Footer";

type Props = {
  isPaid: boolean;
};

const LandingPage = ({ isPaid }: Props) => {
  const pricing = useRef<HTMLElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar
        pricingRef={pricing}
        playgroundRef={playgroundRef}
        isPaid={isPaid}
      />
      <Hero ref={playgroundRef} />
      <AiFeature />
      <Features />
      <UseCase />
      {/* <Demo /> */}
      <Pricing ref={pricing} />
      <Footer />
    </>
  );
};

export default LandingPage;
