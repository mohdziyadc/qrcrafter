import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Check, MoveRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

const QRCrafterProCard = (props: Props) => {
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
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">QRCrafter Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center">
              <div className="text-2xl text-muted-foreground/80 line-through mr-2">
                $199
              </div>
              <div className="text-4xl ">$149</div>
            </div>
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
        <CardFooter>
          <Button className="flex flex-row w-full">
            <p>Get QRCrafter Pro</p>
            <MoveRightIcon className="h-6 w-6 ml-4" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default QRCrafterProCard;
