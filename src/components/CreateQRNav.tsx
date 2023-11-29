"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import StaticQRForm from "./StaticQRForm";
import DynamicQRForm from "./DynamicQRForm";
import Link from "next/link";

type Props = {};

const CreateQRNav = (props: Props) => {
  const { push } = useRouter();
  const [isStaticDialog, setIsStaticDialog] = useState(false);
  const [isDynamicDialog, setIsDynamicDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <PlusCircleIcon className="mr-2 w-4 h-4" />
            Create QR Code
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={"/aiqrcode"}>AI QR Code</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDynamicDialog(true)}>
            Dynamic QR Code
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsStaticDialog(true)}>
            Static QR Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isStaticDialog} onOpenChange={setIsStaticDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Static QR Code</DialogTitle>
            <DialogDescription>Create a static QR code here</DialogDescription>
          </DialogHeader>

          <StaticQRForm />
        </DialogContent>
      </Dialog>

      <Dialog open={isDynamicDialog} onOpenChange={setIsDynamicDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Dynamic QR Code</DialogTitle>
            <DialogDescription>Create a dynamic QR code here</DialogDescription>
          </DialogHeader>
          <DynamicQRForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateQRNav;
