"use client";
import { urlFormSchema } from "@/validators/qrFormSchema";
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
import { Button } from "./ui/button";
import axios from "axios";
import Image from "next/image";

type Props = {
  isContent: boolean;
  setIsContent: React.Dispatch<React.SetStateAction<boolean>>;
};

type urlFormInput = z.infer<typeof urlFormSchema>;

const DynamicURLForm = (props: Props) => {
  const [qrCode, setQrCode] = useState("");
  const form = useForm<urlFormInput>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmitHandler = async ({ url }: urlFormInput) => {
    const response = await axios.post("/api/dynamicqr/url", {
      url: url,
    });
    if (response) {
      setQrCode(response.data.qrCode);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-center items-center mt-4">
            <Button type="submit">Generate QR</Button>
          </div>
        </form>
      </Form>
      {qrCode && (
        <div className="flex justify-center items-center mt-2 ">
          <Image
            src={qrCode}
            alt="dynamic qr"
            height={200}
            width={200}
            className="border-2 border-black rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default DynamicURLForm;

/**
 * Enter a URL
 * Generate a QR Code -> Unique to the user
 * Save it to DB
 * Show success toast
 * Should be able to update this QR Code
 * On Dialog Close -> All the data should be gone and should be able to generate a new one.
 */
