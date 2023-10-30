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

  const handleSubmit = useCallback((values: aiUrlInput) => {}, []);
  return (
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
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AiURLForm;
