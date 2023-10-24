"use client";
import {
  dynamicUrlQrFormSchema,
  urlFormSchema,
} from "@/validators/qrFormSchema";
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
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  isContent: boolean;
  setIsContent: React.Dispatch<React.SetStateAction<boolean>>;
};

type urlFormInput = z.infer<typeof dynamicUrlQrFormSchema>;

const DynamicURLForm = (props: Props) => {
  const [qrCode, setQrCode] = useState("");
  const form = useForm<urlFormInput>({
    resolver: zodResolver(dynamicUrlQrFormSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });
  const {
    mutate: generateDynamicUrlQr,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ url, name }: urlFormInput) => {
      const response = await axios.post("/api/dynamicqr/url", {
        url: url,
        name: name,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setQrCode(data.qrCode);
    },
    onError: (error) => {
      console.log(`[MUTATION ERROR] ${error}`);
    },
  });
  const onSubmitHandler = async ({ url, name }: urlFormInput) => {
    generateDynamicUrlQr({ url, name });
  };

  if (form.getValues("url").length >= 1 || form.getValues("name").length >= 1) {
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
                <FormItem className="w-full">
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
          <div className="flex justify-center items-center mt-4">
            <Button type="submit" disabled={isSuccess}>
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
        <div className="flex flex-col justify-center items-center mt-2 ">
          <Image
            src={qrCode}
            alt="dynamic qr"
            height={200}
            width={200}
            className="border-2 border-black rounded-lg"
          />
          <div className="mt-4 text-gray-400 text-sm">
            <p>
              Your QR code has been saved.{" "}
              <span>
                <Link href={"/manage"} className="underline underline-offset-1">
                  Manage QR Code
                </Link>
              </span>
            </p>
          </div>
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
