"use client";
import { useImage } from "@/app/context/useImage";
import { useLoading } from "@/app/context/useLoading";
import LoadingSpinner from "@/app/manage/loading";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

type Props = {};

const DynamicAIQRCodeCard = (props: Props) => {
  const { loading } = useLoading();
  const { image } = useImage();

  return (
    <div className="flex flex-1 justify-center ">
      {loading ? (
        <LoadingSpinner component />
      ) : (
        image.image_url && (
          <Card className={cn("p-6")}>
            <CardContent>
              <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto max-w-full">
                <Image
                  src={image.image_url}
                  className="rounded "
                  alt="qr code"
                  width={480}
                  height={480}
                />
                <p className="text-gray-400 text-sm italic">
                  QR code took {(image.latency_ms / 1000).toFixed(2)} seconds to
                  generate.
                </p>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default DynamicAIQRCodeCard;
