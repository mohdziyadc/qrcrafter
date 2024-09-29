"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

type Props = {};

const SignInButton = (props: Props) => {
  const { push } = useRouter();
  return (
    // <Button className="text-base" onClick={() => push("/signin")}>
    //   Sign Up <ArrowRight className="h-5 w-5 ml-2" />
    // </Button>
    <Button className="text-base" onClick={() => signIn()}>
      Sign Up <ArrowRight className="h-5 w-5 ml-2" />
    </Button>
  );
};

export default SignInButton;
