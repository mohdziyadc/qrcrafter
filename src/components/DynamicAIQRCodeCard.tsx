"use client";
import { useImage } from "@/app/context/useImage";
import { useLoading } from "@/app/context/useLoading";
import LoadingSpinner from "@/app/manage/loading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { saveAiQRCode } from "@/lib/types";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import downloadQrCode from "@/lib/downloadQrCode";
type Props = {};

const DynamicAIQRCodeCard = (props: Props) => {
  const { loading } = useLoading();
  const { image } = useImage();
  const { toast } = useToast();
  const [disableBtn, setDisableBtn] = useState(false);

  /**
   * After saving the QR Code, should the users be able to regenerate QR?
   */
  useEffect(() => {
    if (image) {
      setDisableBtn(false);
    }
  }, [image]);

  const {
    mutate: saveQRCode,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ url, imageUrl, token, name }: saveAiQRCode) => {
      const params: saveAiQRCode = {
        url: url,
        imageUrl: imageUrl,
        token: token,
        name: name,
      };
      const response = await axios.post(
        "/api/aiqrcode/url/save",
        JSON.stringify(params)
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "QR Code saved successfully",
      });
      setDisableBtn(true);
    },
    onError: (e) => {
      console.log("Error " + e);
      toast({
        title: "Error!",
        description: "An unknown error occurred during this process.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-1 justify-center ">
      {loading ? (
        <LoadingSpinner component />
      ) : (
        image.image_url && (
          <Card className={"px-6 pt-6 pb-2"}>
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
            <CardFooter className="flex flex-col">
              <div className="flex flex-row mt-4 items-center justify-center gap-2 ">
                <Button
                  onClick={() => {
                    saveQRCode({
                      url: image.user_url,
                      imageUrl: image.image_url,
                      token: image.token,
                      name: image.qr_name,
                    });
                  }}
                  disabled={disableBtn && isSuccess}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save QR Code"
                  )}
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    downloadQrCode(image.image_url, "aiQrCode");
                  }}
                >
                  Download
                </Button>
              </div>
              <p className="text-gray-400 text-sm italic text-center mt-2">
                You should save the QR code if you want to update it later.
              </p>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
};

export default DynamicAIQRCodeCard;
