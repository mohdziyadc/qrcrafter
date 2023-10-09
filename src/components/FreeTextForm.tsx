"use client";
import { freeTextFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { InfoIcon } from "lucide-react";

type Props = {};

type freeTextInput = z.infer<typeof freeTextFormSchema>;
const FreeTextForm = (props: Props) => {
  //   const [freeText, setFreeText] = useState("");
  const form = useForm<freeTextInput>({
    resolver: zodResolver(freeTextFormSchema),
    defaultValues: {
      text: "",
    },
  });
  const formErrors = form.formState.errors;

  const onSubmitHandler = () => {};
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your text here" {...field} />
                  </FormControl>
                  {formErrors.text && (
                    <span className="text-red-500 text-sm">
                      {formErrors.text.message}
                    </span>
                  )}
                </FormItem>
              );
            }}
          />
          <div className="mt-2 flex flex-row text-sm justify-center bg-gray-200 p-2 rounded-md font-extralight">
            <InfoIcon className="w-8 h-8 mr-2" />
            <div>
              For text with length greater than 32, a Dynamic QR code would be
              short and easier to compute than a static QR.
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button type="submit">Generate QR</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FreeTextForm;
