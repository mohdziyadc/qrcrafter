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

  return (
    <>
      <Navbar ref={pricing} isPaid={isPaid} />
      <Hero />
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
