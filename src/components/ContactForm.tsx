import { contactFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

type contactInput = z.infer<typeof contactFormSchema>;
const ContactForm = (props: Props) => {
  const form = useForm<contactInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      organisation: "",
      email: "",
      phone_number: "",
    },
  });
  const formErrors = form.formState.errors;
  const onSubmitHandler = ({
    first_name,
    last_name,
    organisation,
    email,
    phone_number,
  }: contactInput) => {
    const inputObject = {
      first_name: first_name,
      last_name: last_name,
      organisation: organisation,
      email: email,
      phone_number: phone_number,
    };
    console.log(inputObject);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
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
              {formErrors.email && (
                <span className="text-red-500 text-sm">
                  {formErrors.email.message}
                </span>
              )}
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
              {formErrors.phone_number && (
                <span className="text-red-500 text-sm">
                  {formErrors.phone_number.message}
                </span>
              )}
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center mt-4">
          <Button type="submit">Generate QR</Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
