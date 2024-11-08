"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signInFormSchema } from "@/validators/qrFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import React from "react";
import GoogleLogo from "super-tiny-icons/images/svg/google.svg";
import TwitterLogo from "super-tiny-icons/images/svg/x.svg";
import FacebookLogo from "super-tiny-icons/images/svg/facebook.svg";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { signIn } from "next-auth/react";

const LOGO_URL =
  "https://pub-c39a57a5d64440d1a0abfeecdb85f452.r2.dev/qrCrafter-Logo.png";
type Props = {};

type signInForm = z.infer<typeof signInFormSchema>;
const SignIn = (props: Props) => {
  const form = useForm<signInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandler = () => {};
  return (
    <div className="flex justify-center items-center bg-secondary-foreground h-screen">
      <Card className="md:w-[30%] border-4  border-primary">
        <CardHeader className="mb-4">
          <CardTitle className="flex flex-row items-center justify-center">
            <Image
              src={LOGO_URL}
              alt="logo"
              width={45}
              height={45}
              className="rounded-lg mr-2"
            />
            <p className="text-3xl text-secondary-foreground font-bold">
              QRCrafter
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-4">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sign in with E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormDescription>Password-less Login</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    onClick={() =>
                      signIn("email", {
                        email: form.getValues("email"),
                        callbackUrl: "/",
                      })
                    }
                  >
                    <div className="flex flex-row justify-center items-center gap-6">
                      <p>Get magic link to sign in</p>
                      <div>
                        <MoveRight className="h-6 w-6" />
                      </div>
                    </div>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex justify-center item-center mt-2">
            <div className="flex-[1] flex items-center">
              <Separator />
            </div>
            <div className="text-center mx-2 text-muted-foreground">OR</div>
            <div className="flex-[1] flex items-center">
              <Separator />
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-2">
            <Button
              className="w-full bg-secondary-foreground/95 hover:bg-black"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <div className="flex flex-row items-center justify-center w-full">
                <Image
                  src={GoogleLogo}
                  alt="google"
                  className="rounded-lg mr-2"
                  height={25}
                  width={25}
                />
                <p className="text-md">Sign In with Google</p>
              </div>
            </Button>
            <Button className="w-full bg-secondary-foreground/95 hover:bg-black">
              <div className="flex flex-row items-center justify-center w-full">
                <Image
                  src={TwitterLogo}
                  alt="twitter"
                  className="rounded-lg mr-2"
                  height={25}
                  width={25}
                />
                <p className="text-md">Sign In with Twitter</p>
              </div>
            </Button>
            <Button className="w-full bg-secondary-foreground/95 hover:bg-black">
              <div className="flex flex-row items-center justify-center w-full">
                <Image
                  src={FacebookLogo}
                  alt="facebook"
                  className="rounded-lg mr-2"
                  height={25}
                  width={25}
                />
                <p className="text-md">Sign In with Facebook</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
