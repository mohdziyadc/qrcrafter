import { aiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiURLQRCode } from "@prisma/client";
import Image from "next/image";
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
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type Props = {
  qrCode: AiURLQRCode;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
type updateAiUrlInput = z.infer<typeof aiUrlFormSchema>;
const UpdateAiUrlForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateAiUrlInput>({
    resolver: zodResolver(aiUrlFormSchema),
    defaultValues: {
      name: qrCode.name,
      url: qrCode.url,
      prompt: "UPDATE FORM - NO PROMPT",
    },
  });
  const fetchImage = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const data = await response.blob();
    return URL.createObjectURL(data);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["imageFetch", qrCode.image_url],
    queryFn: async () => {
      const res = await fetchImage(qrCode.image_url);
      return res;
    },
  });
  const onSubmitHandler = () => {};
  return (
    <>
      <div className="flex justify-center items-center mt-2 ">
        <div className="border-2 border-black rounded-md">
          {isLoading && (
            <div className="h-[200px] w-[200px] flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          {data && (
            <Image src={data} alt="saved ai qr-code" width={200} height={200} />
          )}
        </div>
      </div>
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
                // hidden: isSuccess,
              })}
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              {/* {isLoading ? (
                <Loader2 className=" animate-spin" />
              ) : isSuccess ? (
                <p>Updated</p>
              ) : (
                <p>Update QR</p>
              )} */}
              Update QR
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateAiUrlForm;
