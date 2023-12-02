import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { MoveRightIcon } from "lucide-react";

type Props = {};

const QRCrafterProCard = (props: Props) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">QRCrafter Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-row justify-start items-center">
              <div className="text-2xl text-muted-foreground/80 line-through mr-2">
                $199
              </div>
              <div className="text-4xl ">$149</div>
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
