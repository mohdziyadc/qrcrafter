"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
type Props = {};

const Demo = (props: Props) => {
  return (
    <section className="relative">
      <div className="absolute left-0 right-0 m-auto  transform sm:-translate-y-1/3 sm:block hidden ">
        <div className="-mt-5 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="200"
            viewBox="0 0 324 462"
            fill="none"
          >
            <path
              d="M203.443 426.799C205.684 426.48 206.519 426.826 207.361 426.495C258.863 389.714 294.004 337.218 307.776 266.253C311.29 248.343 310.895 229.722 307.142 211.41C299.38 172.074 272.495 144.756 239.239 142.092C221.914 140.585 205.115 142.806 189.913 154.181C188.708 163.987 187.782 173.796 186.024 182.92C183.096 197.788 176.557 209.917 165.026 217.262C156.586 222.942 148.197 222.868 143.771 217.412C137.961 210.252 138.045 200.775 141.749 193.022C146.878 182.235 153.12 172.135 159.635 162.714C163.884 156.659 169.521 151.631 174.599 146.598C170.184 108.308 140.407 91.7965 104.473 107.389C103.307 112.794 102.137 118.539 100.691 123.942C94.9222 143.863 84.4412 159.003 67.6004 165.963C61.1449 168.614 54.1451 169.567 48.6153 162.41C44.4687 156.957 44.5525 147.48 49.1104 138.042C56.5125 123.213 67.511 112.816 79.3363 103.781C83.5577 100.772 87.7791 97.7629 91.9976 95.0921C86.9286 35.8085 43.3974 -6.55119 0.124524 16.7617C0.443059 12.364 0.196327 8.63819 1.33281 6.6172C2.75192 4.2602 5.83985 2.93347 8.36252 2.27876C32.1792 -2.92679 54.2402 0.653315 72.2307 21.7998C85.7951 37.4911 94.8554 56.5276 100.816 78.2447C101.628 81.2984 102.44 84.3522 103.531 87.4084C103.528 87.7469 104.085 88.0903 105.194 89.1156C107.714 88.7994 110.79 88.8266 113.872 88.1768C151.405 81.4 170.872 93.7584 187.835 136.222C191.203 134.897 195.129 133.578 198.78 131.918C220.389 123.308 241.927 122.821 263.66 131.814C299.048 146.345 321.651 183.442 323.755 230.174C324.929 255.573 321.078 279.911 313.319 303.538C294.357 360.578 263.759 405.329 218.198 434.376C215.946 436.049 213.417 437.381 211.165 439.053C210.883 439.389 210.597 440.064 209.74 442.087C219.224 444.879 228.181 443.943 237.135 443.345C245.807 443.083 254.764 442.147 264.278 441.554C263.361 450.347 259.416 453.697 254.644 455.686C249.034 457.667 243.417 460.326 237.822 460.615C222.716 461.158 207.333 461.361 191.962 460.209C179.947 459.088 176.66 451.273 182.078 439.473C193.764 414.527 205.73 389.583 217.696 364.639C219.689 360.595 222.236 357.232 225.354 352.521C230.601 360.014 228.316 365.41 226.314 370.47C218.323 388.679 211.17 406.895 203.443 426.799ZM57.094 152.33C76.4156 149.454 88.5714 134.667 89.5959 113.689C76.643 123.729 64.2584 132.76 57.094 152.33ZM151.146 205.63C167.686 201.037 175.636 187.567 174.14 166.905C163.419 177.642 154.101 187.715 151.146 205.63Z"
              fill="#C8C8C8"
            />
          </svg>
        </div>
      </div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2 sm:hidden"></div>

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
      <div className="flex justify-center items-center mb-4 ">
        <Button className=" w-1/6 mb-4">
          <div className="flex justify-between items-center">
            <div>Get QRCrafter</div>
            <div className="ml-4 -mr-4">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </Button>
      </div>
    </section>
  );
};

export default Demo;
