"use client";
import Link from "next/link";
import React, {
  MutableRefObject,
  forwardRef,
  startTransition,
  useRef,
  useState,
} from "react";
import SignInButton from "./buttons/SignInButton";
import DashboardButton from "./buttons/DashboardButton";
import Image from "next/image";
import { ArrowRightIcon, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";

type Props = {
  isPaid: boolean;
  pricingRef: React.RefObject<HTMLElement>;
  playgroundRef: React.RefObject<HTMLDivElement>;
};

const LOGO_URL =
  "https://pub-c39a57a5d64440d1a0abfeecdb85f452.r2.dev/qrCrafter-Logo.png";

const Navbar = ({ isPaid, pricingRef, playgroundRef }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleMenuClick = () => setToggleMenu(!toggleMenu);

  const { data: session } = useSession();
  const posthog = usePostHog();

  const pricingClickHandler = () => {
    posthog.capture("pricing_nav_btn_clicked");
    pricingRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const tryClickHandler = () => {
    posthog.capture("nav_try_btn_clicked");
    playgroundRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="relative  border-2 border-double border-teal-400 rounded-lg   m-2   max-w-full z-11">
      <div className="absolute top-0 z-[-10] h-[200vh] w-screen bg-[#2070922e] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:24px_24px]"></div>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center">
          <div className=" flex flex-row justify-center items-center font-bold text-4xl">
            <div className="mr-3">
              <Image
                src={LOGO_URL}
                alt="logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <div>QRCoded</div>
          </div>
          <div className=" hidden md:flex flex-row text-lg justify-center items-center">
            <div className="relative group mr-5">
              <Link href={"/"}>
                Home
                <span className="absolute left-0 -bottom-1 rounded-xl  w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </div>
            <div className="relative group mr-5">
              <p className="hover:cursor-pointer" onClick={tryClickHandler}>
                Try
                <span className="absolute rounded-xl  left-0 -bottom-1  w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </p>
            </div>
            <div className="relative group mr-5">
              <p className="hover:cursor-pointer" onClick={pricingClickHandler}>
                Pricing
                <span className="absolute rounded-xl  left-0 -bottom-1  w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center ">
            {session?.user ? (
              <DashboardButton />
            ) : (
              // isPaid ? (
              //   <DashboardButton />
              // ) : (
              //   // <div className="flex flex-row gap-2">
              //   //   <Button variant={"outline"} onClick={() => signOut()}>
              //   //     Sign Out
              //   //   </Button>
              //   //   <Button
              //   //     onClick={() =>
              //   //       pricingRef.current.scrollIntoView({ behavior: "smooth" })
              //   //     }
              //   //   >
              //   //     Get QRCrafter <ArrowRightIcon className="ml-2 w-4 h-4" />
              //   //   </Button>
              //   // </div>
              // )
              // <DashboardButton />
              // <Button
              //   className="text-base"
              //   // onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
              //   onClick={() => {
              //     // ref.current.scrollIntoView({ behaviour: "smooth" });
              //     // console.log(pricingElement);
              //     // pricingElement?.scrollIntoView({ behavior: "smooth" });
              //     pricingRef.current.scrollIntoView({ behavior: "smooth" });
              //   }}
              // >
              //   Get QRCrafter
              // </Button>
              <SignInButton isMobile={false} />
            )}
          </div>

          <div
            className="md:hidden hover:cursor-pointer"
            onClick={handleMenuClick}
          >
            {!toggleMenu ? (
              <Menu className="w-8 h-8" />
            ) : (
              <X className="h-8 w-8" />
            )}
          </div>
        </div>
        {toggleMenu && (
          <div className="absolute  pr-10 z-20  w-full  lg:hidden">
            <Card className="w-full mt-2">
              <CardContent>
                <div className="flex flex-col text-lg items-center justify-center  ">
                  <Link
                    href="/"
                    className="py-3 hover:bg-muted text-center rounded-md w-full"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="py-3 hover:bg-muted text-center rounded-md w-full"
                    onClick={() => {
                      tryClickHandler();
                      handleMenuClick();
                    }}
                  >
                    Try
                  </Link>
                  <Link
                    href={"#"}
                    className="py-3 hover:bg-muted text-center rounded-md w-full"
                    onClick={() => {
                      pricingClickHandler();
                      handleMenuClick();
                    }}
                  >
                    Pricing
                  </Link>

                  <SignInButton isMobile={true} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.displayName = "Navbar";
export default Navbar;
