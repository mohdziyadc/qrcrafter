import {
  aiAnonContactSchema,
  aiFreeTextFormSchema,
  aiMultiUrlFormSchema,
  aiUrlFormSchema,
} from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MultiUrlSkeleton from "./MultiUrlSkeleton";
import ContactFormSkeleton from "./ContactFormSkeleton";
import { Button } from "./ui/button";
import { Loader2, QrCode, Zap } from "lucide-react";
import { useLoading } from "@/app/context/useLoading";
import { useImage } from "@/app/context/useImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { getAnonQrCodesCount } from "@/lib/actions";
import HomepageCTA from "./HomepageCTA";

type Props = {
  qrType: string;
};

export type FormInput = {
  name: string;
  url?: string;
  urls: string[];
  titles: string[];
  freetext?: string;
  first_name?: string;
  last_name?: string;
  organisation?: string;
  email?: string;
  phone_number?: string;
  prompt: string;
};
const HomepageForm = ({ qrType }: Props) => {
  const { loading, setLoading } = useLoading();
  const { image, setImage } = useImage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  //creating a reference object - a workaround to access state in setTimeout
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const getSchema = () => {
    switch (qrType) {
      case "url":
        return aiUrlFormSchema;
      case "multi_url":
        return aiMultiUrlFormSchema;
      case "contact":
        return aiAnonContactSchema;
      case "free_text":
        return aiFreeTextFormSchema;
      default:
        return aiUrlFormSchema;
    }
  };
  const form = useForm<FormInput>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      name: "",
      url: "",
      urls: [""],
      titles: [""],
      freetext: "",
      first_name: "",
      last_name: "",
      organisation: "",
      email: "",
      phone_number: "",
      prompt: "",
    },
  });

  const {
    mutate: getQrCode,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (data: FormInput & { qrType: string }) => {
      const response = await axios.post(
        "/api/aiqrcode/create",
        JSON.stringify(data)
      );
      console.log("[MUTATION RESPONSE] " + JSON.stringify(response));
      return response.data;
    },
    onSuccess: (data) => {
      setLoading("success");
      if (data.allowed) {
        queryClient.invalidateQueries({ queryKey: ["AnonQrCodeCount"] });
      }
      console.log("Setting Image: " + JSON.stringify(data));
      setImage(data.responseData);
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during the process",
        variant: "destructive",
      });
      console.log(`[MUTATION ERROR] ${error}`);
    },
  });

  const onSubmitHandler: SubmitHandler<FormInput> = (data) => {
    console.log(`Form Submitted\n${JSON.stringify(data)}`);
    const qrData = { ...data, qrType: qrType };
    console.log("QR Data " + JSON.stringify(qrData));
    getQrCode(qrData);
    setLoading("loading");

    setTimeout(() => {
      if (loadingRef.current === "loading") {
        setLoading("delayed");
      }
    }, 7000);
  };

  useEffect(() => {
    form.reset();
  }, [form, qrType]);
  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-2">
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
            {qrType === "url" && (
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
            )}
            {qrType === "multi_url" && <MultiUrlSkeleton form={form} />}
            {qrType === "free_text" && (
              <div>
                <FormField
                  control={form.control}
                  name="freetext"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your text here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {qrType === "contact" && <ContactFormSkeleton form={form} />}
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
            <Button className="mt-4 w-full" type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <p className="flex flex-row items-center">
                  <QrCode className="h-4 w-4 mr-2" /> Generate QR Code
                </p>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default HomepageForm;
