import { aiFreeTextFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { QrCode } from "lucide-react";

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
  const onSubmitHandler = () => {};
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
            <QrCode className="h-4 w-4 mr-2" /> Generate QR
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AiFreeTextForm;
