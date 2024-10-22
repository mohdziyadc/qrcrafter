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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="208"
          height="208"
          viewBox="0 0 24 24"
          fill="none"
          className="w-52 h-52"
        >
          <defs>
            <linearGradient
              id="qr-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FCD34D", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#EC4899", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          {/* Corner squares */}
          <rect
            width="5"
            height="5"
            x="3"
            y="3"
            rx="1"
            stroke="url(#qr-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            width="5"
            height="5"
            x="16"
            y="3"
            rx="1"
            stroke="url(#qr-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            width="5"
            height="5"
            x="3"
            y="16"
            rx="1"
            stroke="url(#qr-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots - changed to use stroke and fill */}
          <circle cx="3" cy="12" r="1" fill="url(#qr-gradient)" />
          <circle cx="12" cy="3" r="1" fill="url(#qr-gradient)" />
          <circle cx="12" cy="16" r="1" fill="url(#qr-gradient)" />
          <circle cx="21" cy="12" r="1" fill="url(#qr-gradient)" />
          {/* Longer paths */}
          <path
            d="M21 16h-3a2 2 0 0 0-2 2v3"
            stroke="url(#qr-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7v3a2 2 0 0 1-2 2H7"
            stroke="url(#qr-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12h1"
            stroke="url(#qr-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 21v-1"
            stroke="url(#qr-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
