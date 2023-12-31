import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Check,
  CheckCircleIcon,
  CheckSquareIcon,
  Loader2,
  MoveRightIcon,
  X,
  XCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {};

const QRCrafterPlusCard = (props: Props) => {
  const features = [
    {
      check: true,
      desc: "300 Dynamic QR codes",
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
      check: false,
      desc: "Dynamic AI QR Codes",
    },
    {
      check: false,
      desc: "Unlimited Dynamic QR codes",
    },
  ];
  const { data: session } = useSession();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const paymentBtnHandler = async () => {
    if (!session?.user) {
      push("/signin");
    }
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe/plus");
      window.location.href = response.data.url;
    } catch (e) {
      throw new Error("Stripe Request Error - " + e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">QRCrafter Plus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center">
              <div className="text-2xl text-muted-foreground/80 line-through mr-2">
                $99
              </div>
              <div className="text-4xl ">$49</div>
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
                    {feature.check ? (
                      <Check className="h-6 w-6 mr-2" color="#4CAF50" />
                    ) : (
                      <X className="h-6 w-6 mr-2" color="#EF5350" />
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
                {" "}
                <p>Get QRCrafter Plus</p>
                <MoveRightIcon className="h-8 w-8 ml-4" />
              </>
            )}
          </Button>
          <p className="text-muted-foreground/80 mt-2">
            Pay Once. Use for lifetime!
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default QRCrafterPlusCard;
