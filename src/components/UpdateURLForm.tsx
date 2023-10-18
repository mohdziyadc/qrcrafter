"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { dynamicUrlQrFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DynamicURL } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  qrCode: DynamicURL;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

type updateFormInput = z.infer<typeof dynamicUrlQrFormSchema>;
const UpdateURLForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateFormInput>({
    resolver: zodResolver(dynamicUrlQrFormSchema),
    defaultValues: {
      name: qrCode.name,
      url: qrCode.url,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const {
    mutate: updateQRCode,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ url, name }: updateFormInput) => {
      const response = await axios.post("/api/dynamicqr/url/update", {
        url: url,
        name: name,
        uniqueToken: qrCode.uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Update Success",
        description: "Your QR code has been updated!",
        variant: "default",
      });
      router.refresh();
      setEditDialog(false);
    },
    onError: () => {
      toast({
        title: "Error Occured",
        description: "Updation of QR code has met with an error!",
        variant: "destructive",
      });
    },
  });

  const onSumbitHandler = ({ url, name }: updateFormInput) => {
    // console.log("Update Button Clicked");
    updateQRCode({ url, name });
  };
  return (
    <>
      <div className="flex justify-center items-center mt-2 ">
        <Image
          src={qrCode.qrCode}
          alt="saved qr-code"
          className="border-2 border-black rounded-md"
          width={200}
          height={200}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbitHandler)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name" {...field} />
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
          <div className="flex flex-row justify-start items-center mt-4">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => setEditDialog(false)}
              className={cn({
                hidden: isSuccess,
              })}
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-2" disabled={isSuccess}>
              {isLoading ? (
                <Loader2 className=" animate-spin" />
              ) : isSuccess ? (
                <p>Updated</p>
              ) : (
                <p>Update QR</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateURLForm;
