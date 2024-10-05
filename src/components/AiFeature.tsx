import Image from "next/image";
import React from "react";
import ScreenShot from "public/qrcrafter_ss.png";

type Props = {};

const AiFeature = (props: Props) => {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2 "></div>
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
