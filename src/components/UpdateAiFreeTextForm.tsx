import React, { Dispatch, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { aiFreeTextFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFreeTextQr } from "@prisma/client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import axios from "axios";
import { useToast } from "./ui/use-toast";
type Props = {
  qrCode: AiFreeTextQr;
  editDialog: boolean;
  setEditDialog: Dispatch<SetStateAction<boolean>>;
};

type updateFreetextInput = z.infer<typeof aiFreeTextFormSchema>;
const UpdateAiFreeTextForm = ({ qrCode, editDialog, setEditDialog }: Props) => {
  const form = useForm<updateFreetextInput>({
    resolver: zodResolver(aiFreeTextFormSchema),
    defaultValues: {
      name: qrCode.name,
      freetext: qrCode.freetext,
      prompt: "EMPTY",
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fetchImageObjectUrl = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const responseBlob = await response.blob();
    return URL.createObjectURL(responseBlob);
  };
  const { data, isLoading: fetchingImage } = useQuery({
    queryKey: ["aiFreetextImage", qrCode.image_url],
    queryFn: async () => {
      return await fetchImageObjectUrl(qrCode.image_url);
    },
  });

  const {
    mutate: updateAiFreeTextQr,
    isLoading: isUpdating,
    isSuccess,
  } = useMutation({
    mutationFn: async (params: updateFreetextInput) => {
      const response = await axios.post("/api/aiqrcode/freetext/update", {
        name: params.name,
        freetext: params.freetext,
        uniqueToken: qrCode.uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have successfully updated this QR code.",
      });
      queryClient.invalidateQueries(["aiFreeTextQrCodes"]);
      setEditDialog(false);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
        variant: "destructive",
      });
    },
  });
  function onSubmitHandler(params: updateFreetextInput) {
    updateAiFreeTextQr(params);
  }

  return (
    <>
      <div className="flex justify-center items-center mt-2 ">
        <div className="border-2 border-black rounded-md">
          {fetchingImage && (
            <div className="h-[200px] w-[200px] flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          {data && (
            <Image src={data} alt="saved ai qr-code" width={200} height={200} />
          )}
        </div>
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
            name="freetext"
            render={({ field }) => {
              return (
                <FormItem className="w-full mt-2">
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <ScrollArea className=" h-20">
                      <Textarea placeholder="Enter text here" {...field} />
                    </ScrollArea>
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
            <Button type="submit" className="ml-2" disabled={isSuccess}>
              {isUpdating ? (
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

export default UpdateAiFreeTextForm;
