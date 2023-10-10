"use client";
import { urlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type Props = {};

type urlFormInput = z.infer<typeof urlFormSchema>;
const URLForm = (props: Props) => {
  const [qrCode, setQrCode] = useState("");
  const { mutate: getQRCode, isLoading } = useMutation({
    mutationFn: async ({ url }: urlFormInput) => {
      const response = await axios.post("/api/qrcode", {
        url: url,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setQrCode(data.qrCode);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const form = useForm<urlFormInput>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const formErrors = form.formState.errors;

  const onSubmitHandler = ({ url }: urlFormInput) => {
    console.log(`URL: ${url}`);
    getQRCode({ url });
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
                  {formErrors.url && (
                    <span className="text-sm text-red-500">
                      {formErrors.url.message}
                    </span>
                  )}
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

export default URLForm;
