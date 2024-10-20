import {
  aiAnonContactSchema,
  aiContactFormSchema,
} from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiContactQr, AnonymousContactQr } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { updateAnonAiContactQr } from "@/lib/actions";

type Props = {
  qrCode: AiContactQr | AnonymousContactQr;
  editDialog: boolean;
  setEditDialog: Dispatch<SetStateAction<boolean>>;
  isAnonymous: boolean;
};

type updateAiContactInput = z.infer<
  typeof aiContactFormSchema | typeof aiAnonContactSchema
>;

const UpdateAiContactForm = ({
  qrCode,
  editDialog,
  setEditDialog,
  isAnonymous,
}: Props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getSchema = () => {
    if (isAnonymous) {
      return aiAnonContactSchema;
    }
    return aiContactFormSchema;
  };

  const form = useForm<updateAiContactInput>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      first_name: qrCode.first_name,
      last_name: qrCode.last_name,
      organisation: qrCode.organisation,
      email: qrCode.email,
      phone_number: qrCode.phone_number,
      prompt: "EMPTY",
      name: (qrCode as AnonymousContactQr).name,
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

  const {
    mutate: updateAiContactQr,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async (params: updateAiContactInput) => {
      const response = await axios.post("/api/aiqrcode/contact/update", {
        first_name: params.first_name,
        last_name: params.last_name,
        organisation: params.organisation,
        email: params.email,
        phone_number: params.phone_number,
        uniqueToken: qrCode.uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["aiContactQrCodes"]);
      toast({
        title: "Success!",
        description: "You have successfully updated the QR code.",
      });
      setEditDialog(false);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during the process.",
        variant: "destructive",
      });
    },
  });
  const {
    mutate: updateAnonContactQr,
    isLoading: isAnonUpdating,
    isSuccess: isAnonSuccess,
  } = useMutation({
    mutationFn: async (payload: updateAiContactInput) => {
      const payloadWithName = payload as z.infer<typeof aiAnonContactSchema>;
      const res = await updateAnonAiContactQr({
        name: payloadWithName.name,
        user_first_name: payloadWithName.first_name,
        user_last_name: payloadWithName.last_name,
        user_organisation: payloadWithName.organisation,
        user_email: payloadWithName.email,
        user_phone_number: payloadWithName.phone_number,
        uniqueToken: qrCode.uniqueToken,
      });
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["AnonAiContactQrCodes"]);
        toast({
          title: "Success!",
          description: "You have successfully updated the QR code.",
        });
        setEditDialog(false);
      }
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during the process.",
        variant: "destructive",
      });
    },
  });
  const onSubmitHandler = (params: updateAiContactInput) => {
    if (isAnonymous) {
      updateAnonContactQr(params);
      return;
    }
    updateAiContactQr(params);
  };

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
            {(qrCode as AnonymousContactQr).name !== undefined && (
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
              <Button
                type="submit"
                className="ml-2"
                disabled={isSuccess || isAnonSuccess || !form.formState.isDirty}
              >
                {isLoading || isAnonUpdating ? (
                  <Loader2 className=" animate-spin" />
                ) : isSuccess ? (
                  <p>Updated</p>
                ) : (
                  <p>Update QR</p>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateAiContactForm;
