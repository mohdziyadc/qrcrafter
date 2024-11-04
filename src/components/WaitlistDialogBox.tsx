import { Dialog } from "@radix-ui/react-dialog";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import * as z from "zod";

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const WaitlistDialogBox = ({ openDialog, setOpenDialog }: Props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleEmailSubmit = () => {
    const result = emailSchema.safeParse({ email });

    if (result.success) {
      setEmailError("");
      console.log("Email is valid:", result.data.email);
    } else {
      setEmailError(result.error.errors[0].message); // Display error message
    }
  };

  useEffect(() => {
    setEmailError("");
    setEmail("");
  }, [openDialog]);
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className=" ">
          <DialogHeader>
            <DialogTitle className="font-bold">
              Join the waitlist for QRCoded
            </DialogTitle>
          </DialogHeader>

          <div>
            <div className="my-2 font-semibold">
              Join the waitlist for these benefits:
            </div>
            <ul className="px-4">
              <li>✅ Exclusive Early Access</li>
              <li>✅ Shape the product roadmap</li>
              <li>✅ Priority Support</li>
              <li>✅ Real-Time Updates on New Features</li>
              <li>✅ Access to Exclusive Community</li>
            </ul>
          </div>
          <div className="mt-4">
            <Button className="w-full">Discord</Button>
            <div className="flex flex-row mt-2 justify-center items-center">
              <Separator className="flex-[1]" />
              <div className="px-4">OR</div>
              <Separator className="flex-[1]" />
            </div>
            <div className="mt-2">
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="text-red-500">{emailError}</div>}

              <Button
                type="submit"
                className="w-full mt-2"
                onClick={handleEmailSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaitlistDialogBox;
