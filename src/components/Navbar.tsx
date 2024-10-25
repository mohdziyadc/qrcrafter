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
import LogoImage from "public/qrCrafter-Logo.png";
import { ArrowRightIcon, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

type Props = {
  isPaid: boolean;
};

const Navbar = forwardRef<HTMLElement, Props>(({ isPaid }: Props, ref) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleMenuClick = () => setToggleMenu(!toggleMenu);

  const pricingRef = ref as MutableRefObject<HTMLInputElement>;
  const { data: session } = useSession();

  console.log("isPaid " + isPaid);

  return (
    <nav className="relative max-w-full z-10">
      <div className="absolute top-0 z-[-10] h-[150vh] w-screen bg-[#2070922e] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:24px_24px]"></div>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center">
          <div className=" flex flex-row justify-center items-center font-bold text-4xl">
            <div className="mr-3">
              <Image
                src={LogoImage}
                alt="logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <div>QRCoded</div>
          </div>
          <div className=" hidden md:flex flex-row text-lg justify-center items-center">
            <div className="mr-5">
              <Link href={"/"}>Home</Link>
            </div>
            <div className="mr-5">
              <Link href={"/try"}>Try</Link>
            </div>
            <div className="mr-5">
              <p
                className="hover:cursor-pointer"
                onClick={() =>
                  pricingRef.current.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Pricing
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
              <SignInButton />
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
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
