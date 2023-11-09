import { aiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiURLQRCode } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Loader2 } from "lucide-react";

type Props = {
  qrCode: AiURLQRCode;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
type updateAiUrlInput = z.infer<typeof aiUrlFormSchema>;
const UpdateAiUrlForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateAiUrlInput>({
    resolver: zodResolver(aiUrlFormSchema),
    defaultValues: {
      name: qrCode.name,
      url: qrCode.url,
      prompt: "UPDATE FORM - NO PROMPT",
    },
  });
  const onSubmitHandler = () => {};
  return (
    <>
      <div className="flex justify-center items-center mt-2 ">
        <Image
          src={qrCode.image_url}
          alt="saved qr-code"
          className="border-2 border-black rounded-md"
          width={200}
          height={200}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
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
            name="url"
            render={({ field }) => {
              return (
                <FormItem className="w-full mt-2">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
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
                // hidden: isSuccess,
              })}
            >
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              {/* {isLoading ? (
                <Loader2 className=" animate-spin" />
              ) : isSuccess ? (
                <p>Updated</p>
              ) : (
                <p>Update QR</p>
              )} */}
              Update QR
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateAiUrlForm;
