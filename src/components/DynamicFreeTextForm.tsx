"use client";
import { dynamicFreeTextFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  isContent: boolean;
  setIsContent: React.Dispatch<React.SetStateAction<boolean>>;
};

type dynamicFreeTextInput = z.infer<typeof dynamicFreeTextFormSchema>;
const DynamicFreeTextForm = (props: Props) => {
  const [qrCode, setQRCode] = useState("");

  const form = useForm<dynamicFreeTextInput>({
    resolver: zodResolver(dynamicFreeTextFormSchema),
    defaultValues: {
      name: "",
      text: "",
    },
  });

  const onSubmitHandler = ({ name, text }: dynamicFreeTextInput) => {
    console.log(`FREE TEXT: ${text}`);
  };
  // Show alert dialog if user types anything else don't
  if (
    form.getValues("text").length >= 1 ||
    form.getValues("name").length >= 1
  ) {
    props.setIsContent(true);
  } else {
    props.setIsContent(false);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="w-full mb-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a name for the QR code"
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
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your text here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center mt-4">
            <Button type="submit">
              <p>Generate QR</p>
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

export default DynamicFreeTextForm;
