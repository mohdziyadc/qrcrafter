"use client";
import { multiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  content: boolean;
  setContent: React.Dispatch<React.SetStateAction<boolean>>;
};

type multiUrlInput = z.infer<typeof multiUrlFormSchema>;
const MultiURLForm = (props: Props) => {
  // const [urlArray, setUrlArray] = useState([""]);
  const [qrCode, setQrCode] = useState("");

  const form = useForm<multiUrlInput>({
    resolver: zodResolver(multiUrlFormSchema),
    defaultValues: {
      urls: ["", ""],
      titles: ["", ""],
    },
  });
  const formErrors = form.formState.errors;

  const { mutate: getMultiQR, isLoading } = useMutation({
    mutationFn: async ({ urls: urlArray, titles }: multiUrlInput) => {
      const response = await axios.post("/api/staticqr/multiurlqr", {
        urls: urlArray,
        titles: titles,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setQrCode(data.multiQr);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const onSubmitHandler = ({ urls, titles }: multiUrlInput) => {
    console.log(
      JSON.stringify({
        url: urls,
        title: titles,
      })
    );
    getMultiQR({ urls, titles });
  };

  // Show alert dialog if user types anything else don't
  if (
    form.getValues("urls").some((url) => url.length >= 1) ||
    form.getValues("titles").some((url) => url.length >= 1)
  ) {
    props.setContent(true);
  } else {
    props.setContent(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <div>
            <AnimatePresence>
              <ScrollArea className="h-72">
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
                              {formErrors.urls && (
                                <span className="text-red-500 text-sm flex-[2] ml-1">
                                  {formErrors.urls[index]?.message}
                                </span>
                              )}
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
                              {formErrors.titles && (
                                <span className="text-red-500 text-sm flex-[2] ml-1">
                                  {formErrors.titles[index]?.message}
                                </span>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </ScrollArea>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              {/* To make it a normal btn add type attribute. If it isnt added, it will try to submit the form */}
              <Button
                type="button"
                variant={"secondary"}
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
                variant={"secondary"}
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("urls", form.watch("urls").slice(0, -1)); //removing from the units array
                  form.setValue("titles", form.watch("titles").slice(0, -1));
                }}
                disabled={form.watch("urls").length == 2}
              >
                Remove URL
                <Trash className="w-4 h-4 text-red-500 ml-2" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className=" animate-spin" />
              ) : (
                <p>Generate QR</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
      {qrCode && (
        // animation needed
        <div className="flex justify-center items-center mt-2">
          <Image
            className="border-black rounded-lg border-2"
            src={qrCode}
            alt="qrcode"
            height={200}
            width={200}
          />
        </div>
      )}
    </div>
  );
};

export default MultiURLForm;
