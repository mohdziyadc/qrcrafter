import React from "react";
import * as z from "zod";
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
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { DynamicContact } from "@prisma/client";
import { contactFormSchema } from "@/validators/qrFormSchema";

type Props = {
  qrCode: DynamicContact;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

type updateFormInput = z.infer<typeof contactFormSchema>;
const UpdateContactForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: qrCode.firstName,
      last_name: qrCode.lastName,
      organisation: qrCode.organisation,
      email: qrCode.email,
      phone_number: qrCode.phoneNumber,
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: updateQR,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({
      first_name,
      last_name,
      organisation,
      email,
      phone_number,
    }: updateFormInput) => {
      const response = await axios.post("/api/dynamicqr/contact/update", {
        first_name: first_name,
        last_name: last_name,
        organisation: organisation,
        email: email,
        phone_number: phone_number,
        uniqueToken: qrCode.uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dynamicContactQr"]);
      toast({
        title: "Success!",
        description: "You have updated the QR code successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
        variant: "destructive",
      });
    },
  });
  const onSubmitHandler = ({
    first_name,
    last_name,
    organisation,
    email,
    phone_number,
  }: updateFormInput) => {
    // console.log("Update Button Clicked");
    updateQR({ first_name, last_name, organisation, email, phone_number });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-2 w-full ">
        <Image
          src={qrCode.qrCode}
          alt="saved qr-code"
          className="border-2  mb-2 border-black rounded-md"
          width={200}
          height={200}
        />
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
                  hidden: isSuccess,
                })}
              >
                Cancel
              </Button>
              <Button type="submit" className="ml-2" disabled={isSuccess}>
                {isLoading ? (
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

export default UpdateContactForm;
