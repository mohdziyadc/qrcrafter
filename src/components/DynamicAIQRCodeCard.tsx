"use client";
import { useImage } from "@/app/context/useImage";
import { useLoading } from "@/app/context/useLoading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  AiContactResponse,
  AiFreeTextResponse,
  AiMultiUrlResponse,
  AiUrlResponse,
  saveAiQRCode,
} from "@/lib/types";
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
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [querySuccess, setQuerySuccess] = useState(false);

  /**
   * After saving the QR Code, should the users be able to regenerate QR?
   */
  function isAiUrlResponse(
    response:
      | AiUrlResponse
      | AiMultiUrlResponse
      | AiContactResponse
      | AiFreeTextResponse
  ): response is AiUrlResponse {
    return (response as AiUrlResponse).user_url !== undefined;
  }

  function isAiMultiUrlResponse(
    response:
      | AiUrlResponse
      | AiMultiUrlResponse
      | AiContactResponse
      | AiFreeTextResponse
  ): response is AiMultiUrlResponse {
    return (response as AiMultiUrlResponse).user_titles !== undefined;
  }

  function isAiFreeTextResponse(
    response:
      | AiUrlResponse
      | AiMultiUrlResponse
      | AiContactResponse
      | AiFreeTextResponse
  ): response is AiFreeTextResponse {
    return (response as AiFreeTextResponse).user_free_text !== undefined;
  }

  function isAiContactResponse(
    response:
      | AiUrlResponse
      | AiMultiUrlResponse
      | AiContactResponse
      | AiFreeTextResponse
  ): response is AiContactResponse {
    return (response as AiContactResponse).user_email !== undefined;
  }

  useEffect(() => {
    if (image) {
      setDisableBtn(false);
    }
  }, [image]);

  const { mutate: saveAiUrlQrCode } = useMutation({
    onMutate: () => {
      setLoadingBtn(true);
    },
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
      setLoadingBtn(false);
      setQuerySuccess(true);
    },
    onError: (e) => {
      console.log("Error " + e);
      toast({
        title: "Error!",
        description: "An unknown error occurred during this process.",
        variant: "destructive",
      });
      setLoadingBtn(false);
    },
  });

  const { mutate: saveMultiUrlAiQr } = useMutation({
    onMutate: () => {
      setLoadingBtn(true);
    },
    mutationFn: async ({
      name,
      user_urls,
      user_titles,
      image_url,
      token,
      latency_ms,
    }: AiMultiUrlResponse) => {
      const response = await axios.post(
        "/api/aiqrcode/multiurl/save",
        JSON.stringify({
          name: name,
          user_urls: user_urls,
          user_titles: user_titles,
          image_url: image_url,
          token: token,
          latency_ms: latency_ms,
        })
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "QR Code saved successfully",
      });
      setDisableBtn(true);
      setLoadingBtn(false);
      setQuerySuccess(true);
    },
    onError: (e) => {
      console.log("Error " + e);
      toast({
        title: "Error!",
        description: "An unknown error occurred during this process.",
        variant: "destructive",
      });
      setLoadingBtn(false);
    },
  });

  const { mutate: saveAiFreeTextQr } = useMutation({
    onMutate: () => {
      setLoadingBtn(true);
    },
    mutationFn: async (params: AiFreeTextResponse) => {
      const payload: AiFreeTextResponse = {
        name: params.name,
        image_url: params.image_url,
        user_free_text: params.user_free_text,
        token: params.token,
        latency_ms: params.latency_ms,
      };
      const response = await axios.post(
        "/api/aiqrcode/freetext/save",
        JSON.stringify(payload)
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "QR Code saved successfully",
      });
      setLoadingBtn(false);
      setQuerySuccess(true);
      setDisableBtn(true);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during this process.",
        variant: "destructive",
      });
      setLoadingBtn(false);
    },
  });

  const { mutate: saveAiContactQr } = useMutation({
    onMutate: () => {
      setLoadingBtn(true);
    },
    mutationFn: async (payload: AiContactResponse) => {
      const response = await axios.post(
        "/api/aiqrcode/contact/save",
        JSON.stringify(payload)
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "QR Code saved successfully",
      });
      setLoadingBtn(false);
      setQuerySuccess(true);
      setDisableBtn(true);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during this process.",
        variant: "destructive",
      });
      setLoadingBtn(false);
    },
  });

  /**
   * We have different types for QR Code. We need to verify which type it is
   * and call the appropriate mutation to save it to the DB
   */
  const checkTypeAndSave = () => {
    if (isAiUrlResponse(image)) {
      console.log("AI URL ", image.user_url);
      saveAiUrlQrCode({
        url: image.user_url,
        imageUrl: image.image_url,
        token: image.token,
        name: image.name,
      });
    } else if (isAiMultiUrlResponse(image)) {
      console.log("AI Multi URL");
      saveMultiUrlAiQr({
        user_urls: image.user_urls,
        user_titles: image.user_titles,
        name: image.name,
        token: image.token,
        image_url: image.image_url,
        latency_ms: image.latency_ms,
      });
    } else if (isAiFreeTextResponse(image)) {
      console.log("AI FreeText QR Code");
      saveAiFreeTextQr({
        name: image.name,
        image_url: image.image_url,
        latency_ms: image.latency_ms,
        token: image.token,
        user_free_text: image.user_free_text,
      });
    } else if (isAiContactResponse(image)) {
      console.log("AI Contact QR Code");
      saveAiContactQr({
        user_first_name: image.user_first_name,
        user_last_name: image.user_last_name,
        user_organisation: image.user_organisation,
        user_email: image.user_email,
        user_phone_number: image.user_phone_number,
        image_url: image.image_url,
        token: image.token,
        latency_ms: image.latency_ms,
      });
    }
  };
  console.log("Loading Status: ", loading);
  return (
    <div className="flex flex-1 justify-center ">
      {loading === "loading" ? (
        <div className="flex flex-col justify-center items-center w-full">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className=" text-primary/70 italic mt-1 animate-pulse">
            Crafting your magic QR Code{" "}
          </p>{" "}
        </div>
      ) : loading === "delayed" ? (
        <div className="flex flex-col justify-center items-center w-full">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className=" text-primary/70 italic mt-1 animate-pulse">
            Finishing up
          </p>{" "}
        </div>
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
                    checkTypeAndSave();
                  }}
                  disabled={disableBtn && querySuccess}
                >
                  {loadingBtn ? (
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
