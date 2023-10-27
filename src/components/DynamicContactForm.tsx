import { contactFormSchema } from "@/validators/qrFormSchema";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  isContent: boolean;
  setIsContent: React.Dispatch<React.SetStateAction<boolean>>;
};

type dynamicContactInput = z.infer<typeof contactFormSchema>;
const DynamicContactForm = (props: Props) => {
  const [qrCode, setQRCode] = useState("");
  const form = useForm<dynamicContactInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      organisation: "",
      email: "",
      phone_number: "",
    },
  });
  const { toast } = useToast();

  const {
    mutate: createQR,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({
      first_name,
      last_name,
      organisation,
      email,
      phone_number,
    }: dynamicContactInput) => {
      const response = await axios.post("/api/dynamicqr/contact", {
        first_name: first_name,
        last_name: last_name,
        organisation: organisation,
        email: email,
        phone_number: phone_number,
      });
      return response.data.qrCode;
    },
    onSuccess: (qrCode) => {
      toast({
        title: "Success!",
        description: "You have created the QR Code successfully.",
      });
      setQRCode(qrCode);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during this process.",
        variant: "destructive",
      });
    },
  });

  const onSubmitHandler = ({
    first_name,
    last_name,
    organisation,
    email,
    phone_number,
  }: dynamicContactInput) => {
    createQR({
      first_name,
      last_name,
      organisation,
      email,
      phone_number,
    });
  };

  if (
    form.getValues("first_name").length >= 1 ||
    form.getValues("last_name").length >= 1 ||
    form.getValues("organisation").length >= 1 ||
    form.getValues("email").length >= 1 ||
    form.getValues("phone_number").length >= 1
  ) {
    props.setIsContent(true);
  } else {
    props.setIsContent(false);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <div className="flex flex-row ">
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-[1] mr-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-[1]">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="organisation"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel>Organisation</FormLabel>
                <FormControl>
                  <Input placeholder="Organisation Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone_number"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Contact Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center mt-4">
            <Button type="submit" disabled={isSuccess}>
              {isLoading ? (
                <div>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
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

export default DynamicContactForm;
