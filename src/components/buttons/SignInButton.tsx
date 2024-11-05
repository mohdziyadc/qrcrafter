"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import WaitlistDialogBox from "../WaitlistDialogBox";
import clsx from "clsx";

type Props = {
  isMobile: boolean;
};

const SignInButton = ({ isMobile }: Props) => {
  const { push } = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const posthog = usePostHog();

  const btnClickHandler = () => {
    setOpenDialog(!openDialog);
    posthog.capture("nav_signup_clicked");
  };
  return (
    // <Button className="text-base" onClick={() => push("/signin")}>
    //   Sign Up <ArrowRight className="h-5 w-5 ml-2" />
    // </Button>
    // <Button className="text-base" onClick={() => signIn()}>
    //   Sign Up <ArrowRight className="h-5 w-5 ml-2" />
    // </Button>
    <>
      <Button
        className={clsx("text-base", {
          "w-full": isMobile,
        })}
        onClick={btnClickHandler}
      >
        Sign Up <ArrowRight className="h-5 w-5 ml-2" />
      </Button>
      <WaitlistDialogBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};

export default SignInButton;
