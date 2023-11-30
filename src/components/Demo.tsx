"use client";
import React from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
type Props = {};

const Demo = (props: Props) => {
  return (
    <section className="relative bg-gray-100">
      <div className="relative max-w-6xl mx-auto">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-5xl font-extrabold mb-4">
              How does it{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-400">
                work
              </span>
              ?
            </h1>
            <p className="text-xl text-gray-600">
              Generate beautiful QR Codes with just a few clicks.
            </p>
          </div>
        </div>
      </div>
      {/* <ModalVideo
        thumb={VideoThumb}
        thumbWidth={768}
        thumbHeight={432}
        thumbAlt="Modal video thumbnail"
        video="/videos/video.mp4"
        videoWidth={1920}
        videoHeight={1080}
      /> */}
      <div
        className="flex justify-center items-center pb-8 px-6 rounded-lg "
        data-aos="zoom-y-out"
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          width={768}
          height={432}
          controls
          light
          style={{ border: 1, borderRadius: 5 }}
        />
      </div>
    </section>
  );
};

export default Demo;
