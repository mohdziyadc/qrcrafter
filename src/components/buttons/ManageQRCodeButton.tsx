"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const ManageQRCodeButton = (props: Props) => {
  const { push } = useRouter();
  return (
    <Button
      variant={"outline"}
      className="mr-2 p-4"
      onClick={() => {
        push("/manage");
      }}
    >
      Manage QR Codes
    </Button>
  );
};

export default ManageQRCodeButton;
