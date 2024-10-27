"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Check, MoveRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {};

const JoinWaitlistCard = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const features = [
    {
      check: true,
      desc: "Unlimited Dynamic AI QR Codes",
    },
    {
      check: true,
      desc: "Unlimited Dynamic QR codes",
    },
    {
      check: true,
      desc: "Unlimited Static QR codes",
    },
    {
      check: true,
      desc: "QR Code Scan Analytics",
    },
    {
      check: true,
      desc: "Multiple types of QR codes",
    },
    {
      check: true,
      desc: "Editable QR codes",
    },
    {
      check: true,
      desc: "24/7 Customer Support",
    },
    {
      check: true,
      desc: "Lifetime Updates",
    },
  ];

  return (
    <Card className="border-4 border-primary bg-secondary-foreground text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-3xl">QRCoded Pro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="mt-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={cn("flex flex-row text-lg mb-2", {
                  "text-muted-foreground/60": !feature.check,
                })}
              >
                <div>
                  {feature.check && (
                    <Check className="h-6 w-6 mr-2" color="#4CAF50" />
                  )}
                </div>
                <div>{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="flex flex-row text-primary text-lg p-6 w-full"
          variant={"outline"}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <p>Join waitlist</p>
          <MoveRightIcon className="h-8 w-8 ml-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinWaitlistCard;
