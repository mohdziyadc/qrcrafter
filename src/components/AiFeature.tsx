import Image from "next/image";
import React from "react";
import ScreenShot from "public/qrcrafter_ss.png";

type Props = {};

const AiFeature = (props: Props) => {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute left-0 right-0 m-auto  transform sm:-translate-y-3/4 sm:block hidden ">
        <div className="-mt-5 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="200"
            viewBox="0 0 118 566"
            fill="none"
          >
            <path
              d="M97.2699 3.56288C72.3218 35.934 61.9886 61.32 64.6022 102.175C66.9624 139.07 85.2817 178.896 98.7298 212.991C115.38 255.204 129.371 338.431 79.4869 364.12C40.7533 384.066 -6.57109 356.221 5.27499 310.72C9.84189 293.179 32.9567 283.71 49.2651 291.123C66.8795 299.129 75.7786 323.917 80.1409 341.094C91.8565 387.227 49.0466 418.947 42.2387 461.03C35.8784 500.347 53.9948 529.098 78.3073 558.303C80.3899 560.805 66.8378 559.767 63.4547 559.833C51.0524 560.074 56.6051 562.447 65.9824 562.264C72.0134 562.147 84.8978 565.074 81.3138 557.005C78.728 551.183 77.9286 538.856 77.8004 532.269"
              stroke="#C8C8C8"
              strokeWidth="6.49254"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2 sm:hidden"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-5xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-6xl font-extrabold mb-4">
              Let your
              <span className="bg-clip-text text-transparent  bg-gradient-to-br from-orange-600  to-yellow-400 ">
                {" "}
                imagination
              </span>{" "}
              run wild
            </h1>
            <p className="text-xl line-clamp-2 text-gray-600">
              <span className="font-bold">QRCrafter</span> lets you create
              dynamic QR Codes with a prompt of your choice. Let the AI generate
              your QR Code with the prompt. No templates. Leave it your
              imagination to create beautiful and authentic QR codes.
            </p>
          </div>
        </div>
        <div className="pb-10 mb-8">
          <Image
            src={ScreenShot}
            alt="qrcrafter-ss"
            style={{ objectFit: "contain" }}
            data-aos="zoom-y-out"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AiFeature;
