import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

type Props = {};

const SS_IMAGE_URL =
  "https://pub-c39a57a5d64440d1a0abfeecdb85f452.r2.dev/qrcrafter_ss.png";
const AiFeature = (props: Props) => {
  const fetchImageObjectUrl = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const data = await response.blob();
    return URL.createObjectURL(data);
  };

  const { data, isLoading: fetchingImage } = useQuery({
    queryKey: ["fetchAiContactImage", SS_IMAGE_URL],
    queryFn: async () => {
      return await fetchImageObjectUrl(SS_IMAGE_URL);
    },
  });
  return (
    <section className="relative border-b-[1px]">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="max-w-7xl mx-auto flex flex-col px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-5xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Let your
              <span className="bg-clip-text text-transparent  bg-gradient-to-br from-orange-600  to-yellow-400 ">
                {" "}
                imagination
              </span>{" "}
              run wild
            </h1>
            <p className="text-lg sm:text-xl p-2 text-center  text-primary/90">
              <span className="font-bold">QRCoded</span> lets you create dynamic
              QR Codes with a prompt of your choice. Let the AI generate your QR
              Code with the prompt. No templates. Leave it your imagination to
              create beautiful and authentic QR codes.
            </p>
          </div>
        </div>
        <div className="pb-10 mb-8 relative">
          {data && (
            <Image
              src={data}
              alt="qrcrafter-ss"
              style={{ objectFit: "contain" }}
              data-aos="zoom-y-out"
              className="rounded-lg"
              layout="responsive"
              sizes="100vw"
              width={500} // Set a fixed width
              height={500}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AiFeature;
