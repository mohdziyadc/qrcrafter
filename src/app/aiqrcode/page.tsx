import DynamicAIQRCodeCard from "@/components/DynamicAIQRCodeCard";
import DynamicAIQRCodeForm from "@/components/DynamicAIQRCodeForm";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const AIQrCode = (props: Props) => {
  return (
    <div className="flex flex-col p-6">
      <div className="w-full flex justify-start items-center ">
        <Link href={"/dashboard"}>
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>
      <div>
        <h1 className="font-semibold text-3xl mt-10 underline underline-offset-4 ">
          Create a dynamic AI QR Code
        </h1>
      </div>
      <div className="mt-4 flex flex-row  items-center">
        <DynamicAIQRCodeForm />
        <DynamicAIQRCodeCard />
      </div>
    </div>
  );
};

export default AIQrCode;
