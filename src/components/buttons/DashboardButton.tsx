"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const DashboardButton = (props: Props) => {
  const { push } = useRouter();
  return (
    <Button
      onClick={() => {
        push("/dashboard");
      }}
    >
      Go to Dashboard <ArrowRightIcon className="ml-2 w-4 h-4" />
    </Button>
  );
};

export default DashboardButton;
