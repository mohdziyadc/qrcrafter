"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const SignIn = (props: Props) => {
  const form = useForm({});
  return (
    <div className="flex justify-center items-center bg-secondary-foreground  h-screen">
      <Card className="w-[30%]">
        <CardHeader className="text-center">
          <CardTitle>Sign In to QRCrafter</CardTitle>
        </CardHeader>
        <CardContent>
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
