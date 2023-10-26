import { dynamicFreeTextFormSchema } from "@/validators/qrFormSchema";
import { DynamicFreeText } from "@prisma/client";
import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {
  qrCode: DynamicFreeText;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

type updateFormInput = z.infer<typeof dynamicFreeTextFormSchema>;
const UpdateFreeTextForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateFormInput>({
    resolver: zodResolver(dynamicFreeTextFormSchema),
    defaultValues: {
      name: qrCode.name,
      text: qrCode.freetext,
    },
  });

  const onSumbitHandler = ({ text, name }: updateFormInput) => {
    // console.log("Update Button Clicked");
    // updateQRCode({ url, name });
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-2 ">
        <Image
          src={qrCode.qrCode}
          alt="saved qr-code"
          className="border-2 border-black rounded-md"
          width={200}
          height={200}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbitHandler)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => {
              return (
                <FormItem className="w-full mt-2">
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex flex-row justify-start items-center mt-4">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => setEditDialog(false)}
              className={cn({
                //   hidden: isSuccess,
              })}
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              <p>Update QR</p>

              {/* {isLoading ? (
          <Loader2 className=" animate-spin" />
        ) : isSuccess ? (
          <p>Updated</p>
        ) : (
          <p>Update QR</p>
        )} */}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateFreeTextForm;
