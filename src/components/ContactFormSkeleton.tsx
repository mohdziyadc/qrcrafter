import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { FormInput } from "./HomepageForm";
import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  form: UseFormReturn<FormInput, any, undefined>;
};

const ContactFormSkeleton = ({ form }: Props) => {
  return (
    <>
      <div className="flex flex-row ">
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
    </>
  );
};

export default ContactFormSkeleton;
