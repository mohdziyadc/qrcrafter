import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "./ui/scroll-area";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormInput } from "./HomepageForm";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Plus, Trash } from "lucide-react";

type Props = {
  form: UseFormReturn<FormInput, any, undefined>;
};

const MultiUrlSkeleton = ({ form }: Props) => {
  return (
    <>
      <AnimatePresence>
        <ScrollArea className="h-96">
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
                          <Input placeholder="Enter title here" {...field} />
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
            disabled={form.watch("urls").length == 2}
          >
            Remove URL
            <Trash className="w-4 h-4 text-red-500 ml-2" />
          </Button>
        </div>
        <Separator className="flex-[1]" />
      </div>
    </>
  );
};

export default MultiUrlSkeleton;
