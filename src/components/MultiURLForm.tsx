"use client";
import { multiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

type Props = {};

type multiUrlInput = z.infer<typeof multiUrlFormSchema>;
const MultiURLForm = (props: Props) => {
  // const [urlArray, setUrlArray] = useState([""]);
  const [qrCode, setQrCode] = useState("");
  const form = useForm<multiUrlInput>({
    resolver: zodResolver(multiUrlFormSchema),
    defaultValues: {
      urls: ["", ""],
    },
  });
  const formErrors = form.formState.errors;

  const { mutate: getMultiQR, isLoading } = useMutation({
    mutationFn: async ({ urls: urlArray }: multiUrlInput) => {
      const response = await axios.post("/api/multiurlqr", {
        urls: urlArray,
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
  const onSubmitHandler = ({ urls }: multiUrlInput) => {
    getMultiQR({ urls });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <AnimatePresence>
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
                <FormField
                  control={form.control}
                  key={index}
                  name={`urls.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-center items-baseline">
                      <FormLabel className="flex-[1]">
                        URL {index + 1}
                      </FormLabel>
                      <FormControl className="flex-[7]">
                        <Input placeholder="Enter URL here" {...field} />
                      </FormControl>
                      {formErrors.urls && (
                        <span className="text-red-500 text-sm flex-[2] ml-1">
                          {formErrors.urls[index]?.message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>
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
            <Button type="submit">Generate QR</Button>
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
