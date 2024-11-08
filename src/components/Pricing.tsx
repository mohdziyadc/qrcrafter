import React, { forwardRef, useEffect, useRef } from "react";
import JoinWaitlistCard from "./JoinWaitlistCard";
import { usePostHog } from "posthog-js/react";

type Props = {};

const Pricing = forwardRef<HTMLElement, Props>(({}: Props, ref) => {
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const posthog = usePostHog();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            posthog.capture("pricing_section_scrolled", {
              scroll_percent: Math.round(entry.intersectionRatio * 100),
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (pricingSectionRef.current) {
      observer.observe(pricingSectionRef.current);
    }

    return () => observer.disconnect();
  });
  return (
    <section ref={ref} id="pricing" className="relative ">
      <div ref={pricingSectionRef}>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,_#000_40%,_#2dd4bf_100%)]"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="text-5xl font-extrabold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-400">
                  Pricing
                </span>
              </h1>
              <p className="text-2xl ">
                <span className="font-bold">Beautiful</span> QR codes,{" "}
                <span className="font-bold">Sensible</span> Pricing.
                <span className="font-bold"> Elevate</span> your business with
                QRCoded&apos;s pricing plans
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center items-center text-2xl ">
        <p>
          Limited Time Offer: <span className="font-bold">Lifetime</span> Deals
        </p>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 p-6 gap-4 max-w-5xl m-auto">
        <div data-aos="zoom-y-out">
          <QRCrafterPlusCard />
        </div>
        <div data-aos="zoom-y-out">
          <QRCrafterProCard />
        </div>
      </div> */}
      <div className="grid  grid-cols-1 p-6 gap-4 max-w-lg m-auto">
        <div data-aos="zoom-y-out">
          <JoinWaitlistCard />
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";
export default Pricing;
