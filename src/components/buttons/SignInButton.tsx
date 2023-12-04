"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      className="text-base"
      onClick={() =>
        signIn(undefined, {
          email: "mziyadc@gmail.com",
          callbackUrl: "/dashboard",
        })
      }
    >
      Sign Up
    </Button>
  );
};

export default SignInButton;
