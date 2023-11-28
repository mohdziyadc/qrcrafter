import { aiFreeTextFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "./ui/button";
import { Loader2, QrCode } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useImage } from "@/app/context/useImage";
import { useLoading } from "@/app/context/useLoading";
import { useToast } from "./ui/use-toast";

type Props = {};

type aiFreeTextInput = z.infer<typeof aiFreeTextFormSchema>;
const AiFreeTextForm = (props: Props) => {
  const form = useForm<aiFreeTextInput>({
    resolver: zodResolver(aiFreeTextFormSchema),
    defaultValues: {
      name: "",
      freetext: "",
      prompt: "",
    },
  });
  const { setImage } = useImage();
  const { loading, setLoading } = useLoading();
  const { toast } = useToast();
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const {
    mutate: getAiFreeTextQr,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ name, freetext, prompt }: aiFreeTextInput) => {
      const response = await axios.post("/api/aiqrcode/freetext", {
        name: name,
        freetext: freetext,
        prompt: prompt,
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
  const onSubmitHandler = ({ name, freetext, prompt }: aiFreeTextInput) => {
    setLoading("loading");
    getAiFreeTextQr({ name, freetext, prompt });
    setTimeout(() => {
      if (loadingRef.current === "loading") {
        setLoading("delayed");
      }
    }, 7000);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
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
            name="freetext"
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
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A night with northern lights in the sky"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This would be your prompt for the image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
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

export default AiFreeTextForm;
