import { aiContactFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiContactQr } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
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
import { useQuery } from "@tanstack/react-query";

type Props = {
  qrCode: AiContactQr;
  editDialog: boolean;
  setEditDialog: Dispatch<SetStateAction<boolean>>;
};

type updateAiContactInput = z.infer<typeof aiContactFormSchema>;
const UpdateAiContactForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateAiContactInput>({
    resolver: zodResolver(aiContactFormSchema),
    defaultValues: {
      first_name: qrCode.first_name,
      last_name: qrCode.last_name,
      organisation: qrCode.organisation,
      email: qrCode.email,
      phone_number: qrCode.phone_number,
      prompt: "EMPTY",
    },
  });
  const fetchImageObjectUrl = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const data = await response.blob();
    return URL.createObjectURL(data);
  };

  const { data, isLoading: fetchingImage } = useQuery({
    queryKey: ["fetchAiContactImage", qrCode.image_url],
    queryFn: async () => {
      return await fetchImageObjectUrl(qrCode.image_url);
    },
  });
  const onSubmitHandler = () => {};
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-2 w-full ">
        <div className="flex justify-center items-center mt-2 ">
          <div className="border-2 border-black rounded-md">
            {fetchingImage && (
              <div className="h-[200px] w-[200px] flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            {data && (
              <Image
                src={data}
                alt="saved ai qr-code"
                width={200}
                height={200}
              />
            )}
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="w-full"
          >
            <div className="flex flex-row">
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
      </div>
    </div>
  );
};

export default UpdateAiContactForm;
