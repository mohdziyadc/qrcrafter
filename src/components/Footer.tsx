import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const LOGO_URL =
  "https://pub-c39a57a5d64440d1a0abfeecdb85f452.r2.dev/qrCrafter-Logo.png";

const Footer = (props: Props) => {
  return (
    <section className="bg-primary-foreground pt-4 pb-2 fle flex-col justify-center items-center">
      <div className="flex sm:flex-row flex-col gap-4 sm:gap-0 mb-4 px-8 justify-between items-center w-full">
        <div className="flex gap-4 justify-center items-center">
          <Image
            src={LOGO_URL}
            width={40}
            height={40}
            alt="logo"
            className="rounded-sm"
          />
          <div className="text-3xl font-bold">QRCoded</div>
        </div>
        <div className="flex gap-4 ">
          <div>
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
          </div>
          <div>
            <Link href={"/terms-and-conditions"}>Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-sm text-primary/70 items-center">
        Copyright <Copyright className="h-4 w-4 mx-1" /> 2024 QRCoded. All
        rights reserved
      </div>
    </section>
  );
};

export default Footer;
