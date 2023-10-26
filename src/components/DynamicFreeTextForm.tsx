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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";

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

  const { toast } = useToast();

  const {
    mutate: generateFreeTextQR,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ name, text }: dynamicFreeTextInput) => {
      const response = await axios.post("/api/dynamicqr/freetext", {
        name: name,
        text: text,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "You have created the QR code successfully.",
      });
      setQRCode(data.qrCode);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
        variant: "destructive",
      });
    },
  });

  const onSubmitHandler = ({ name, text }: dynamicFreeTextInput) => {
    generateFreeTextQR({ name, text });
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
        // animation needed
        <div className="flex flex-col justify-center items-center mt-2">
          <Image
            className="border-black rounded-lg border-2"
            src={qrCode}
            alt="qrcode"
            height={200}
            width={200}
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

export default DynamicFreeTextForm;
