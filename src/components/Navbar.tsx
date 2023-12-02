"use client";
import Link from "next/link";
import React, { MutableRefObject, forwardRef, useRef, useState } from "react";
import SignInButton from "./buttons/SignInButton";
import DashboardButton from "./buttons/DashboardButton";
import Image from "next/image";
import LogoImage from "public/qrCrafter-Logo.png";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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
};

const Navbar = forwardRef<HTMLElement, Props>(({ user }: Props, ref) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleMenuClick = () => setToggleMenu(!toggleMenu);

  const pricingRef = ref as MutableRefObject<HTMLInputElement>;

  return (
    <nav className="max-w-full px-6 py-4 z-10">
      <div className="flex justify-between items-center">
        <div className=" flex flex-row justify-center items-center font-bold text-4xl">
          <div className="mr-2">
            <Image
              src={LogoImage}
              alt="logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </div>
          <div>QRCrafter</div>
        </div>
        <div className=" hidden md:flex flex-row text-lg justify-center items-center">
          <div className="mr-5">
            <Link href={"/"}>Home</Link>
          </div>
          <div className="mr-5">
            <Link href={"/try"}>Try</Link>
          </div>
          <div className="mr-5">
            <Link href={"/pricing"}>Pricing</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center ">
          {user ? (
            <DashboardButton />
          ) : (
            <Button
              className="text-base"
              // onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
              onClick={() => {
                // ref.current.scrollIntoView({ behaviour: "smooth" });
                // console.log(pricingElement);
                // pricingElement?.scrollIntoView({ behavior: "smooth" });
                pricingRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get QRCrafter
            </Button>
          )}
        </div>

        <div className="md:hidden" onClick={handleMenuClick}>
          {!toggleMenu ? (
            <Menu className="w-8 h-8" />
          ) : (
            <X className="h-8 w-8" />
          )}
        </div>
      </div>
      {toggleMenu && (
        <div className="fixed  pr-10 z-20  w-full  lg:hidden">
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
                  href="/pricing"
                  className="py-3 hover:bg-muted text-center rounded-md w-full"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="py-3 hover:bg-muted text-center rounded-md w-full"
                >
                  Try
                </Link>

                <Button className="w-full">Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
