import { Copyright } from "lucide-react";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <section className="bg-primary-foreground py-4 flex justify-center items-center">
      <div className="flex justify-center text-primary/70 items-center">
        Copyright <Copyright className="h-4 w-4 mx-1" /> 2024 QRCoded. All
        rights reserved
      </div>
    </section>
  );
};

export default Footer;
