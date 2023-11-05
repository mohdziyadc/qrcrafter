import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { aiContactFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "./ui/button";
import { Loader2, QrCode } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useImage } from "@/app/context/useImage";
import { useToast } from "./ui/use-toast";
import { useLoading } from "@/app/context/useLoading";

type Props = {};

type aiContactInput = z.infer<typeof aiContactFormSchema>;
const AiContactForm = (props: Props) => {
  const form = useForm<aiContactInput>({
    resolver: zodResolver(aiContactFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      organisation: "",
      email: "",
      phone_number: "",
      prompt: "",
    },
  });

  const { setImage } = useImage();
  const { setLoading } = useLoading();
  const { toast } = useToast();
  const {
    mutate: getAiContactQr,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (params: aiContactInput) => {
      const response = await axios.post("/api/aiqrcode/contact", {
        first_name: params.first_name,
        last_name: params.last_name,
        organisation: params.organisation,
        email: params.email,
        phone_number: params.phone_number,
        prompt: params.prompt,
      });
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
  const onSubmitHandler = (params: aiContactInput) => {
    setLoading("loading");
    getAiContactQr({
      first_name: params.first_name,
      last_name: params.last_name,
      organisation: params.organisation,
      email: params.email,
      phone_number: params.phone_number,
      prompt: params.prompt,
    });
    setTimeout(() => {
      setLoading("delayed");
    }, 9000);
  };
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
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This would be your prompt for the image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="w-full mt-4">
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
        </form>
      </Form>
    </div>
  );
};

export default AiContactForm;
