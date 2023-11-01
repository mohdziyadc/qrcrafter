"use client";
import React, { useCallback } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { aiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { QrCode } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { QRInputRequest } from "@/lib/types";
import { toast } from "./ui/use-toast";

type Props = {};

type aiUrlInput = z.infer<typeof aiUrlFormSchema>;
const AiURLForm = (props: Props) => {
  const form = useForm<aiUrlInput>({
    resolver: zodResolver(aiUrlFormSchema),
    defaultValues: {
      url: "",
      prompt: "",
    },
  });
  //   const router = useRouter()
  const {
    mutate: getAiQrCode,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ url, prompt }: aiUrlInput) => {
      const payload: QRInputRequest = { url: url, prompt: prompt };
      const response = await axios.post(
        "/api/aiqrcode/url",
        JSON.stringify(payload)
      );
      return response.data;
    },
    onSuccess: (data) => {
      // setImageURL(data.image_url);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during the process.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = ({ url, prompt }: aiUrlInput) => {
    getAiQrCode({ url, prompt });
  };
  return (
    <div className="mt-4 flex flex-row  items-center">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://qrcrafter.pro" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is what your QR code will link to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A flowy lake with clouds in paradise"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="">
                      This is what the image in your QR code will look like.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                <QrCode className="h-4 w-4 mr-2" /> Generate QR Code
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AiURLForm;
