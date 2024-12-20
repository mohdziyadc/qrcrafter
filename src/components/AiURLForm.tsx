"use client";
import React, { useCallback, useRef } from "react";
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
import { Loader2, QrCode } from "lucide-react";
import { isError, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { QRInputRequest } from "@/lib/types";
import { toast } from "./ui/use-toast";
import { useLoading } from "@/app/context/useLoading";
import { useImage } from "@/app/context/useImage";

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
  const { loading, setLoading } = useLoading();
  const { image, setImage } = useImage();

  //creating a reference object - a workaround to access state in setTimeout
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const {
    mutate: getAiQrCode,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ url, prompt, name }: aiUrlInput) => {
      const payload: QRInputRequest = {
        url: url,
        prompt: prompt,
        qr_name: name,
      };
      const response = await axios.post(
        "/api/aiqrcode/url",
        JSON.stringify(payload)
      );
      return response.data;
    },
    onSuccess: (data) => {
      setImage(data);
      setLoading("success");
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during the process.",
        variant: "destructive",
      });
      setLoading("error");
    },
  });

  const handleSubmit = ({ url, prompt, name }: aiUrlInput) => {
    getAiQrCode({ url, prompt, name });

    setLoading("loading");
    //handle the case when it loads before 7 seconds
    console.log(`Loading State before timeout: ${loading} `);

    setTimeout(() => {
      if (loadingRef.current === "loading") {
        setLoading("delayed");
      }
    }, 7000);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This would be the name of the QR code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://qrcoded.pro" {...field} />
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !(isSuccess || isError) ? (
                <p className="flex flex-row items-center">
                  <QrCode className="h-4 w-4 mr-2" /> Generate QR Code
                </p>
              ) : (
                "✨ Regenerate"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AiURLForm;
