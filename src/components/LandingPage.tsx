"use client";
import React, { ElementRef, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AiFeature from "./AiFeature";
import Features from "./features";
import UseCase from "./UseCase";
import Demo from "./Demo";
import Pricing from "./Pricing";

type Props = {
  user:
    | ({
        id: string;
        qrCode: string | null;
      } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
  isPaid: boolean;
};

const LandingPage = ({ user, isPaid }: Props) => {
  const pricing = useRef<HTMLElement>(null);

  return (
    <>
      <Navbar ref={pricing} isPaid={isPaid} />
      <Hero />
      <AiFeature />
      <Features />
      <UseCase />
      <Demo />
      <Pricing ref={pricing} />
    </>
  );
};

export default LandingPage;