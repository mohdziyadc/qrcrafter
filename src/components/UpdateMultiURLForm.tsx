import { dynamicMultiUrlFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicMultiURL } from "@prisma/client";
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
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import axios from "axios";

type Props = {
  qrCode: DynamicMultiURL;
  editDialog: boolean;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

type updateFormInput = z.infer<typeof dynamicMultiUrlFormSchema>;

const UpdateMultiURLForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateFormInput>({
    resolver: zodResolver(dynamicMultiUrlFormSchema),
    defaultValues: {
      name: qrCode.name,
      urls: qrCode.urls,
      titles: qrCode.titles,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: updateQR,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ name, urls, titles }: updateFormInput) => {
      const response = await axios.post("/api/dynamicqr/multiurl/update", {
        name: name,
        urls: urls,
        titles: titles,
        uniqueToken: qrCode.uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dynamicMultiUrlQr"],
      });
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

  const onSubmitHandler = ({ name, urls, titles }: updateFormInput) => {
    updateQR({ name, urls, titles });
  };
  return (
    <>
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
          <AnimatePresence>
            <ScrollArea className="h-48 mt-2">
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
                disabled={form.watch("urls").length == 1}
              >
                Remove URL
                <Trash className="w-4 h-4 text-red-500 ml-2" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
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
    </>
  );
};

export default UpdateMultiURLForm;
