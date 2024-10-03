import {
  aiContactFormSchema,
  aiFreeTextFormSchema,
  aiMultiUrlFormSchema,
  aiUrlFormSchema,
} from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
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
import { QrCode } from "lucide-react";

type Props = {
  qrType: string;
};

export type FormInput = {
  name: string;
  url?: string;
  urls: string[];
  titles: string[];
  freeText?: string;
  first_name?: string;
  last_name?: string;
  organisation?: string;
  email?: string;
  phone_number?: string;
  prompt: string;
};
const HomepageForm = ({ qrType }: Props) => {
  const getSchema = () => {
    switch (qrType) {
      case "url":
        return aiUrlFormSchema;
      case "multi_url":
        return aiMultiUrlFormSchema;
      case "contact":
        return aiContactFormSchema;
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
      urls: ["", ""],
      titles: ["", ""],
      freeText: "",
      first_name: "",
      last_name: "",
      organisation: "",
      email: "",
      phone_number: "",
      prompt: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FormInput> = (data) => {
    console.log(`Form Submitted\n${JSON.stringify(data)}`);
  };
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
              <FormField
                control={form.control}
                name="freeText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              {/* {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : !(isSuccess || isError) ? (
              <p className="flex flex-row items-center">
                <QrCode className="h-4 w-4 mr-2" /> Generate QR Code
              </p>
            ) : (
              "✨ Regenerate"
            )} */}
              <QrCode className="h-4 w-4 mr-2" /> Generate QR Code
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default HomepageForm;
