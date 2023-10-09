"use client";
import React, { SetStateAction, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { urlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type Props = {
  qrCode: string;
  setQrCode: React.Dispatch<SetStateAction<string>>;
};

type qrFormInput = z.infer<typeof urlFormSchema>;
const QRForm = ({ qrCode, setQrCode }: Props) => {
  const form = useForm<qrFormInput>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const {
    mutate: getQRCode,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ url }: qrFormInput) => {
      const response = await axios.post("/api/qrcode", {
        url: url,
      });
      return response.data;
    },
    onSuccess: (data) => {
      //   console.log(`Response from Mutation: ${JSON.stringify(data.qrCode)}`);
      setQrCode(data.qrCode);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const formErrors = form.formState.errors;
  const onSubmitHandler = ({ url }: qrFormInput) => {
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
            render={({ field }) => (
              <FormItem className="mb-4 w-64">
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your link here" {...field} />
                </FormControl>
                {formErrors.url && (
                  <span className="text-sm text-red-500">
                    {formErrors.url.message}
                  </span>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Generate QR
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QRForm;
