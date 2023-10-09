import Link from "next/link";
import React from "react";
import SignInButton from "./buttons/SignInButton";
import { getAuthSession } from "@/lib/auth";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { redirect } from "next/navigation";
import DashboardButton from "./buttons/DashboardButton";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <nav className="max-w-full px-6 py-4">
      <div className="flex justify-between items-center">
        <div className=" flex font-bold text-4xl">QRCoded</div>
        <div className="flex flex-row text-lg items-center">
          <div className="mr-6">
            <Link href={"/"}>Home</Link>
          </div>
          <div className="mr-3">
            <Link href={"/pricing"}>Pricing</Link>
          </div>
        </div>

        <div className="flex items-center ">
          {session?.user ? <DashboardButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
