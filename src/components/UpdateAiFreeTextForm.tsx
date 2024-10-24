import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { aiFreeTextFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFreeTextQr, AnonymousFreetextQr } from "@prisma/client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { updateAnonAiFreetextQr } from "@/lib/actions";
import downloadQrCode from "@/lib/downloadQrCode";
type Props = {
  qrCode: AiFreeTextQr | AnonymousFreetextQr;
  editDialog: boolean;
  setEditDialog: Dispatch<SetStateAction<boolean>>;
  isAnonymous: boolean;
};

type updateFreetextInput = z.infer<typeof aiFreeTextFormSchema>;
const UpdateAiFreeTextForm = ({
  qrCode,
  editDialog,
  setEditDialog,
  isAnonymous,
}: Props) => {
  const form = useForm<updateFreetextInput>({
    resolver: zodResolver(aiFreeTextFormSchema),
    defaultValues: {
      name: qrCode.name,
      freetext: isAnonymous
        ? (qrCode as AnonymousFreetextQr).free_text
        : (qrCode as AiFreeTextQr).freetext,
      prompt: "EMPTY",
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fetchImageObjectUrl = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const responseBlob = await response.blob();
    return URL.createObjectURL(responseBlob);
  };
  const { data, isLoading: fetchingImage } = useQuery({
    queryKey: ["aiFreetextImage", qrCode.image_url],
    queryFn: async () => {
      return await fetchImageObjectUrl(qrCode.image_url);
    },
  });

  const {
    mutate: updateAiFreeTextQr,
    isLoading: isUpdating,
    isSuccess,
  } = useMutation({
    mutationFn: async (params: updateFreetextInput) => {
      const response = await axios.post("/api/aiqrcode/freetext/update", {
        name: params.name,
        freetext: params.freetext,
        uniqueToken: qrCode.uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have successfully updated this QR code.",
      });
      queryClient.invalidateQueries(["aiFreeTextQrCodes"]);
      setEditDialog(false);
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
    mutate: updateAnonQr,
    isLoading: isAnonUpdating,
    isSuccess: isAnonSuccess,
  } = useMutation({
    mutationFn: async ({ name, freetext }: updateFreetextInput) => {
      const res = await updateAnonAiFreetextQr({
        name: name,
        freeText: freetext,
        uniqueToken: qrCode.uniqueToken,
      });
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: "You have successfully updated this QR code.",
        });
        queryClient.invalidateQueries(["AnonAiFreetextQrCodes"]);
        setEditDialog(false);
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

  function onSubmitHandler(params: updateFreetextInput) {
    if (isAnonymous) {
      updateAnonQr(params);
      return;
    }
    updateAiFreeTextQr(params);
  }

  return (
    <>
      <div className="flex justify-center items-center mt-2 ">
        <div className="border-2 border-black rounded-md">
          {fetchingImage && (
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
            name="freetext"
            render={({ field }) => {
              return (
                <FormItem className="w-full mt-2">
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <ScrollArea className=" h-20">
                      <Textarea placeholder="Enter text here" {...field} />
                    </ScrollArea>
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
                disabled={isSuccess || isAnonSuccess || !form.formState.isDirty}
              >
                {isUpdating || isAnonUpdating ? (
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

export default UpdateAiFreeTextForm;
