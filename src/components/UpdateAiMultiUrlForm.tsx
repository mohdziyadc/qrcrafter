import { aiMultiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnonymousMultiUrlQr, MulitUrlAiQr } from "@prisma/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import Image from "next/image";
import { Input } from "./ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { updateAnonAiMultiUrlCode } from "@/lib/actions";
import downloadQrCode from "@/lib/downloadQrCode";

type Props = {
  qrCode: MulitUrlAiQr | AnonymousMultiUrlQr;
  editDialog: boolean;
  setEditDialog: Dispatch<SetStateAction<boolean>>;
  isAnonymous: boolean;
};

type updateAiMultiUrlInput = z.infer<typeof aiMultiUrlFormSchema>;
const UpdateAiMultiUrlForm = ({
  qrCode,
  editDialog,
  setEditDialog,
  isAnonymous,
}: Props) => {
  const form = useForm<updateAiMultiUrlInput>({
    resolver: zodResolver(aiMultiUrlFormSchema),
    defaultValues: {
      name: qrCode.name,
      titles: qrCode.titles,
      urls: qrCode.urls,
      prompt: "EMPTY",
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchImageDataUrl = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const dataBlob = await response.blob();
    return URL.createObjectURL(dataBlob);
  };

  const { data, isLoading: isImageFetching } = useQuery({
    queryKey: ["aiMultiUrlImage", qrCode.image_url],
    queryFn: async () => {
      return await fetchImageDataUrl(qrCode.image_url);
    },
  });

  const {
    mutate: updateAiMultiUrlQr,
    isLoading: isUpdatingAi,
    isSuccess: isAiSuccess,
  } = useMutation({
    mutationFn: async (params: updateAiMultiUrlInput) => {
      const response = await axios.post("/api/aiqrcode/multiurl/update", {
        name: params.name,
        urls: params.urls,
        titles: params.titles,
        uniqueToken: qrCode.uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have updated the QR code successfully.",
      });
      queryClient.invalidateQueries(["aiMultiUrlQrCodes"]);
      setEditDialog(false);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
      });
    },
  });
  const {
    mutate: updateAnonQrcode,
    isLoading: isUpdatingAnon,
    isSuccess: isAnonSuccess,
  } = useMutation({
    mutationFn: async (params: updateAiMultiUrlInput) => {
      const payload = {
        uniqueToken: qrCode.uniqueToken,
        name: params.name,
        urls: params.urls,
        titles: params.titles,
      };
      const res = await updateAnonAiMultiUrlCode(payload);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: "You have updated the QR code successfully.",
        });
        queryClient.invalidateQueries(["AnonAiMultiUrlQrCodes"]);
        setEditDialog(false);
      }
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
      });
    },
  });

  const isUpdating = isUpdatingAnon || isUpdatingAi;
  const isSuccess = isAiSuccess || isAnonSuccess;
  const onSubmitHandler = (formInputs: updateAiMultiUrlInput) => {
    if (isAnonymous) {
      updateAnonQrcode(formInputs);
      return;
    }
    updateAiMultiUrlQr(formInputs);
  };

  return (
    <div>
      <Form {...form}>
        <div className="flex justify-center items-center mt-2 ">
          <div className="border-2 border-black rounded-md">
            {isImageFetching && (
              <div className="h-[200px] w-[200px] flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            {data && (
              <Image
                src={data}
                alt="saved ai qr-code"
                width={200}
                height={200}
              />
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
            <AnimatePresence>
              <ScrollArea className="h-48 mt-2">
                {form.watch("urls").map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      height: { duration: 0.2 },
                    }}
                  >
                    <div className="border-2 border-black mb-2 py-2 rounded-md">
                      <FormField
                        control={form.control}
                        key={index}
                        name={`urls.${index}`}
                        render={({ field }) => {
                          return (
                            <FormItem
                              className="flex flex-col mt-2 px-2 justify-center items-baseline"
                              autoFocus
                            >
                              <FormLabel className="flex-[1] text-md">
                                URL {index + 1}
                              </FormLabel>
                              <FormControl className="">
                                <Input
                                  placeholder="Enter URL here"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name={`titles.${index}`}
                        render={({ field }) => {
                          return (
                            <FormItem
                              autoFocus
                              className="flex flex-col mt-2 px-2 justify-center items-baseline"
                            >
                              <FormLabel className="flex-[1] text-md">
                                Title {index + 1}
                              </FormLabel>
                              <FormControl className="">
                                <Input
                                  placeholder="Enter title here"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </ScrollArea>
            </AnimatePresence>
            <div className="flex items-center justify-center mt-4">
              <Separator className="flex-[1]" />
              <div className="mx-4">
                {/* To make it a normal btn add type attribute. If it isnt added, it will try to submit the form */}
                <Button
                  type="button"
                  variant={"outline"}
                  className="font-semibold"
                  onClick={() => {
                    form.setValue("urls", [...form.watch("urls"), ""]); //appending to the units array
                    form.setValue("titles", [...form.watch("titles"), ""]);
                  }}
                >
                  Add URL
                  <Plus className="w-4 h-4  ml-2" />
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  className="font-semibold ml-2"
                  onClick={() => {
                    form.setValue("urls", form.watch("urls").slice(0, -1)); //removing from the units array
                    form.setValue("titles", form.watch("titles").slice(0, -1));
                  }}
                  disabled={form.watch("urls").length == 1}
                >
                  Remove URL
                  <Trash className="w-4 h-4 text-red-500 ml-2" />
                </Button>
              </div>
              <Separator className="flex-[1]" />
            </div>
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
      </Form>
    </div>
  );
};

export default UpdateAiMultiUrlForm;
