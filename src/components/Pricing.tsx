import React, { forwardRef } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, MoveRightIcon } from "lucide-react";
import QRCrafterPlusCard from "./QRCrafterPlusCard";
import QRCrafterProCard from "./QRCrafterProCard";

type Props = {};

const Pricing = forwardRef<HTMLElement, Props>(({}: Props, ref) => {
  return (
    <section ref={ref} id="pricing" className="relative bg-gray-100">
      <div className="absolute left-0 right-0 m-auto  transform sm:-translate-y-1/3 sm:block hidden ">
        <div className="-mt-5 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="220"
            viewBox="0 0 75 255"
            fill="none"
          >
            <g clipPath="url(#clip0_7_35)">
              <path
                d="M47.5056 209.644C51.9457 201.475 55.379 195.24 58.6058 189.222C59.8191 187.07 60.8192 184.926 62.2522 182.979C64.0853 180.175 66.0988 176.308 70.2146 178.294C74.1172 180.286 72.5367 184.35 71.5628 187.339C70.8086 190.533 69.2018 193.753 67.8016 196.755C61.6204 210.685 55.226 224.621 48.8251 238.346C47.0182 241.995 45.4311 245.848 42.9717 249.095C38.0659 256.01 32.9369 255.747 28.8701 248.477C23.4455 238.712 18.4407 228.724 13.4359 218.735C11.1729 214.579 8.90336 210.211 7.27331 205.823C6.34186 203.316 6.46306 200.354 6.16453 197.616C12.1068 196.585 13.4909 199.924 15.075 202.833C19.3549 210.097 23.4283 217.579 27.7082 224.843C29.2792 227.33 30.8567 230.028 34.3461 232.456C34.6542 228.642 35.1821 225.033 35.277 221.226C35.8826 192.676 36.4948 164.337 37.1004 135.787C37.9449 94.3379 38.796 53.0999 39.8537 11.644C39.9618 8.25921 41.1357 4.84122 42.0767 0.796468C47.9504 4.41793 46.8093 8.8916 46.7078 12.4876C46.9119 32.77 46.6962 53.2768 46.6871 73.5659C46.5543 117.318 46.4216 161.07 46.2888 204.821C46.5348 205.87 46.7677 206.497 47.5056 209.644Z"
                fill="#C8C8C8"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_35">
                <rect
                  width="253"
                  height="67"
                  fill="white"
                  transform="translate(7.94873 254.98) rotate(-91.7815)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-5xl font-extrabold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-400">
                Pricing
              </span>
            </h1>
            <p className="text-2xl text-gray-600">
              <span className="font-bold">Beautiful</span> QR codes,{" "}
              <span className="font-bold">Sensible</span> Pricing.
              <span className="font-bold"> Elevate</span> your business with
              QRCrafter&apos;s pricing plans
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-2xl text-gray-600">
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
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";
export default Pricing;
