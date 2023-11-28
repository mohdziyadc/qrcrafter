import { aiMultiUrlFormSchema } from "@/validators/qrFormSchema";
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
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader2, Plus, QrCode, Trash } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useImage } from "@/app/context/useImage";
import { useLoading } from "@/app/context/useLoading";
import { useToast } from "./ui/use-toast";

type Props = {};

type aiMultiUrlInput = z.infer<typeof aiMultiUrlFormSchema>;
const AiMultiUrlForm = (props: Props) => {
  const form = useForm<aiMultiUrlInput>({
    resolver: zodResolver(aiMultiUrlFormSchema),
    defaultValues: {
      name: "",
      urls: ["", ""],
      titles: ["", ""],
      prompt: "",
    },
  });
  const { image, setImage } = useImage();
  const { loading, setLoading } = useLoading();
  const { toast } = useToast();
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const {
    mutate: getAiMultiUrlQrCode,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ urls, titles, prompt, name }: aiMultiUrlInput) => {
      const response = await axios.post("/api/aiqrcode/multiurl", {
        urls: urls,
        titles: titles,
        name: name,
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
  const onSubmitHandler = ({ urls, titles, name, prompt }: aiMultiUrlInput) => {
    getAiMultiUrlQrCode({ urls, titles, name, prompt });
    setLoading("loading");
    //handle the case when it loads before 7 seconds

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
          <AnimatePresence>
            <ScrollArea className="h-96">
              {form.watch("urls").map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <div className="border-2 border-black mb-2 py-2 rounded-md">
                    <FormField
                      control={form.control}
                      key={index}
                      name={`urls.${index}`}
                      render={({ field }) => {
                        return (
                          <FormItem
                            className="flex flex-col mt-2 px-2 justify-center items-baseline"
                            autoFocus
                          >
                            <FormLabel className="flex-[1] text-md">
                              URL {index + 1}
                            </FormLabel>
                            <FormControl className="">
                              <Input placeholder="Enter URL here" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name={`titles.${index}`}
                      render={({ field }) => {
                        return (
                          <FormItem
                            autoFocus
                            className="flex flex-col mt-2 px-2 justify-center items-baseline"
                          >
                            <FormLabel className="flex-[1] text-md">
                              Title {index + 1}
                            </FormLabel>
                            <FormControl className="">
                              <Input
                                placeholder="Enter title here"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </ScrollArea>
          </AnimatePresence>
          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              {/* To make it a normal btn add type attribute. If it isnt added, it will try to submit the form */}
              <Button
                type="button"
                variant={"secondary"}
                className="font-semibold"
                onClick={() => {
                  form.setValue("urls", [...form.watch("urls"), ""]); //appending to the units array
                  form.setValue("titles", [...form.watch("titles"), ""]);
                }}
              >
                Add URL
                <Plus className="w-4 h-4  ml-2" />
              </Button>
              <Button
                type="button"
                variant={"secondary"}
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("urls", form.watch("urls").slice(0, -1)); //removing from the units array
                  form.setValue("titles", form.watch("titles").slice(0, -1));
                }}
                disabled={form.watch("urls").length == 2}
              >
                Remove URL
                <Trash className="w-4 h-4 text-red-500 ml-2" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="An ancient village covered in snow"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This would be your prompt for the image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="mt-2 w-full" type="submit" disabled={isLoading}>
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

export default AiMultiUrlForm;
