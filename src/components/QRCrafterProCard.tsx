import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Check, Loader2, MoveRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

type Props = {};

const QRCrafterProCard = ({}: Props) => {
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
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const paymentBtnHandler = async () => {
    if (!session?.user) {
      router.push("/signin");
    }
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe/pro");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
      throw new Error("STRIPE REQUEST ERROR " + error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card className="border-4 border-primary bg-secondary-foreground text-primary-foreground">
        <div className="flex justify-center items-center -mt-4">
          <Badge className=" text-md px-6">Popular</Badge>
        </div>
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
        <CardFooter className="flex flex-col">
          <Button
            className="flex flex-row text-lg py-4 w-full"
            onClick={paymentBtnHandler}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <p>Get QRCrafter Pro</p>
                <MoveRightIcon className="h-8 w-8 ml-4" />
              </>
            )}
          </Button>
          <p className=" text-muted/60 mt-2">Pay Once. Use for lifetime!</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default QRCrafterProCard;
