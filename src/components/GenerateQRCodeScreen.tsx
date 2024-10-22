import { QrCode } from "lucide-react";
import React from "react";

type Props = {};

const GenerateQRCodeScreen = (props: Props) => {
  return (
    <div className="flex max-w-7xl flex-col items-center">
      <div className="relative -mt-10  p-2 rounded-lg">
        <div className="absolute top-0 right-0 border-teal-500 border-r-4 border-t-4 rounded-tr-md  w-8 h-8"></div>
        <div className="absolute top-0 left-0  border-teal-500 border-t-4 border-l-4 rounded-tl-md w-8 h-8"></div>
        <div className="absolute bottom-0 right-0  border-teal-500 border-b-4 border-r-4 rounded-br-md w-8 h-8"></div>
        <div className="absolute bottom-0 left-0  border-teal-500 border-b-4 border-l-4 rounded-bl-md w-8 h-8"></div>
        {/* <div className="bg-pink-500 text-transparent bg-clip-text">
          <QrCode className="h-52 w-52 " />
        </div> */}
        <svg className="w-52  h-52 ">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#FCD34D", stopOpacity: 1 }}
              />{" "}
              {/* amber-300 */}
              <stop
                offset="100%"
                style={{ stopColor: "#EC4899", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <QrCode
            stroke="url(#grad)"
            strokeWidth={1.5}
            width="100%"
            height="100%"
          />
        </svg>
      </div>
      <div className="mt-12">
        <div className="text-2xl text-primary/70">
          Your{" "}
          <span className="font-extrabold leading-tighter tracking-tighter mr-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500">
            AI QR Codes
          </span>
          will be displayed here
        </div>
      </div>
      <div className="text-lg mt-4 italic text-primary/60">
        Click on the button to generate
      </div>
    </div>
  );
};

export default GenerateQRCodeScreen;
