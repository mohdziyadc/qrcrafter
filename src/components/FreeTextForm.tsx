"use client";
import { freeTextFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { InfoIcon, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type Props = {};

type freeTextInput = z.infer<typeof freeTextFormSchema>;
const FreeTextForm = (props: Props) => {
  //   const [freeText, setFreeText] = useState("");
  const [qrCode, setQRCode] = useState("");
  const form = useForm<freeTextInput>({
    resolver: zodResolver(freeTextFormSchema),
    defaultValues: {
      text: "",
    },
  });
  const formErrors = form.formState.errors;

  const { mutate: generateFreeTextQR, isLoading } = useMutation({
    mutationFn: async ({ text }: freeTextInput) => {
      const response = await axios.post("/api/staticqr/freetext", {
        text: text,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setQRCode(data.textQr);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onSubmitHandler = ({ text }: freeTextInput) => {
    console.log(`FREE TEXT: ${text.length}`);
    if (text.length <= 2400) {
      generateFreeTextQR({ text });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your text here" {...field} />
                  </FormControl>
                  {form.getValues("text").length >= 32 && (
                    <span className="text-red-500 text-sm">
                      For the data you have entered, a dynamic QR would be
                      shorter and easier to compute
                    </span>
                  )}
                  {formErrors.text && (
                    <span className="text-red-500 text-sm">
                      {formErrors.text.message}
                    </span>
                  )}
                </FormItem>
              );
            }}
          />

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

export default FreeTextForm;
