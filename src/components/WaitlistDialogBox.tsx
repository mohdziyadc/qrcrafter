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
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { usePostHog } from "posthog-js/react";

type Props = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const DISCORD_INVITE_LINK = "https://discord.gg/XmhXmTpt";

const WaitlistDialogBox = ({ openDialog, setOpenDialog }: Props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const posthog = usePostHog();
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

  const handleDiscordClick = () => {
    posthog.capture("discord_btn_clicked");
    window.open(DISCORD_INVITE_LINK, "_blank");
  };
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className=" ">
          <DialogHeader>
            <DialogTitle className="font-bold">
              Be a part of QRCoded's journey
            </DialogTitle>
          </DialogHeader>

          <div>
            <div className="my-2 font-normal">
              Join the waitlist for these benefits:
            </div>
            <ul className="px-4">
              <li>
                <span className="mr-2">✅</span> Exclusive Early Access
              </li>
              <li>
                <span className="mr-2">✅</span> Shape the product roadmap
              </li>
              <li>
                <span className="mr-2">✅</span> Priority Support
              </li>
              <li>
                <span className="mr-2">✅</span> Real-Time Updates on New
                Features
              </li>
              <li>
                <span className="mr-2">✅</span> Access to Exclusive Community
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <Button
              className="w-full bg-[#5865F2] hover:bg-[#39429e] text-white text-lg font-semibold"
              onClick={handleDiscordClick}
            >
              <SiDiscord size={24} className="mr-2" />
              Join Discord
            </Button>
            <div className="flex flex-row mt-2 justify-center items-center">
              <Separator className="flex-[1]" />
              <div className="px-4 text-muted-foreground">OR</div>
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
