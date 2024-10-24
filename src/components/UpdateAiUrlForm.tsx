"use client";
import { aiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiURLQRCode, AnonymousURLQr } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { updateAnonAiUrlQrcode } from "@/lib/actions";
import downloadQrCode from "@/lib/downloadQrCode";

type Props = {
  qrCode: AiURLQRCode | AnonymousURLQr;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isAnonymous: boolean;
};
type updateAiUrlInput = z.infer<typeof aiUrlFormSchema>;
const UpdateAiUrlForm = ({
  qrCode,
  editDialog,
  setEditDialog,
  isAnonymous,
}: Props) => {
  const form = useForm<updateAiUrlInput>({
    resolver: zodResolver(aiUrlFormSchema),
    defaultValues: {
      name: qrCode.name,
      url: qrCode.url,
      prompt: "UPDATE FORM - NO PROMPT",
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchImageDataUrl = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const data = await response.blob();
    return URL.createObjectURL(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["aiUrlImage", qrCode.image_url],
    queryFn: async () => {
      const res = await fetchImageDataUrl(qrCode.image_url);
      return res;
    },
  });

  const {
    mutate: updateAiUrlQrCode,
    isLoading: isAiUrlUpdating,
    isSuccess: aiUrlQrSuccess,
  } = useMutation({
    mutationFn: async ({ url, name }: updateAiUrlInput) => {
      const response = await axios.post("/api/aiqrcode/url/update", {
        uniqueToken: qrCode.uniqueToken,
        name: name,
        url: url,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have successfully updated the QR code",
      });
      setEditDialog(false);
      queryClient.invalidateQueries(["aiUrlQrCodes"]);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
        variant: "destructive",
      });
    },
  });

  const {
    mutate: updateAnonQrcode,
    isLoading: isAnonUpdating,
    isSuccess: isAnonSuccess,
  } = useMutation({
    mutationFn: async ({ name, url }: updateAiUrlInput) => {
      const payload = {
        uniqueToken: qrCode.uniqueToken,
        name: name,
        url: url,
      };
      const res = await updateAnonAiUrlQrcode(payload);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: "You have successfully updated the QR code",
        });
        setEditDialog(false);
        queryClient.invalidateQueries(["AnonAiUrlQrCodes"]);
      }
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
        variant: "destructive",
      });
    },
  });

  const isUpdating = isAiUrlUpdating || isAnonUpdating;
  const isSuccess = aiUrlQrSuccess || isAnonSuccess;
  const onSubmitHandler = ({ url, name, prompt }: updateAiUrlInput) => {
    if (isAnonymous) {
      updateAnonQrcode({ url, name, prompt });
      return;
    }
    updateAiUrlQrCode({ url, name, prompt });
  };
  return (
    <>
      <div className="flex justify-center items-center mt-2 ">
        <div className="border-2 border-black rounded-md">
          {isLoading && (
            <div className="h-[200px] w-[200px] flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          {data && (
            <Image src={data} alt="saved ai qr-code" width={200} height={200} />
          )}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => {
              return (
                <FormItem className="w-full mt-2">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-row justify-start">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setEditDialog(false)}
                className={cn({
                  hidden: isSuccess,
                })}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-2"
                disabled={isSuccess || !form.formState.isDirty}
              >
                {isUpdating ? (
                  <Loader2 className=" animate-spin" />
                ) : isSuccess ? (
                  <p>Updated</p>
                ) : (
                  <p>Update QR</p>
                )}
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  downloadQrCode(qrCode.image_url, `qrCode_${qrCode.name}`);
                }}
                type="button"
              >
                Download
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateAiUrlForm;
