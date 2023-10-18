import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  component: boolean;
};

const LoadingSpinner = ({ component }: Props) => {
  return (
    <div
      className={cn("flex w-full justify-center items-center h-screen", {
        "h-full": component,
      })}
    >
      <Loader2
        className={cn("animate-spin w-12 h-12", {
          "h-6 w-6 m-10": component,
        })}
      />
    </div>
  );
};

export default LoadingSpinner;
