"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnonQrCodesCount } from "@/lib/actions";

type Props = {};

const HomepageCTA = ({}: Props) => {
  const [qrCount, setQrCount] = useState(0);

  const { data: qrCodeCount, isSuccess: isCountFetched } = useQuery({
    queryKey: ["AnonQrCodeCount"],
    queryFn: async () => {
      const res = await getAnonQrCodesCount();
      return res;
    },
  });

  useEffect(() => {
    if (isCountFetched) {
      setQrCount(qrCodeCount.count);
    }
  }, [isCountFetched, qrCodeCount]);
  return (
    <div
      className={`transition-opacity duration-300 ease-in ${
        qrCount >= 2 ? "opacity-100 " : "opacity-0 "
      }`}
    >
      <div className="flex flex-col mt-4 justify-center items-center ">
        <div className="">Remaining QR Codes: {5 - qrCount}</div>
        <div className="italic text-primary/60">
          Sign up to create more QR Codes
        </div>
        <Button
          onClick={() => {
            console.log("Sign Up Button Clicked");
          }}
          className="mt-2  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  bg-gradient-to-tr  from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-600 text-secondary"
        >
          <Zap className="h-5 w-5  mr-2" />
          <div className="text-md font-bold">Sign Up</div>
        </Button>
      </div>
    </div>
  );
};

export default HomepageCTA;
