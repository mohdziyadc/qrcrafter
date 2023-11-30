import { Button } from "./ui/button";
import HeroImage from "public/qrcrafter_hero.png";
import Image from "next/image";
// import ModalVideo from '@/components/modal-video'

export default function Hero() {
  return (
    <section className="relative  w-full">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-10 hidden sm:block"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="96" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="flex flex-col sm:flex-row pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="flex-[1] pb-12 md:pb-16">
            <div className="flex flex-col md:justify-start md:items-start justify-center items-center">
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-2"
                data-aos="zoom-y-out"
              >
                No more boring
              </h1>
              <h1
                data-aos="zoom-y-out"
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
              >
                QR Codes
              </h1>
            </div>

            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Create beautiful dynamic AI generated QR Codes to level up your
                marketing game.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-start"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Button className=" text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                    Start free trial
                  </Button>
                </div>
                <div>
                  <Button className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4">
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div
            className="flex-[1] flex justify-center items-stretch"
            data-aos="zoom-y-out"
          >
            <Image
              src={HeroImage}
              alt="hero_image"
              height={400}
              width={400}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="-mt-5 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="220"
            viewBox="0 0 118 566"
            fill="none"
          >
            <path
              d="M97.2699 3.56288C72.3218 35.934 61.9886 61.32 64.6022 102.175C66.9624 139.07 85.2817 178.896 98.7298 212.991C115.38 255.204 129.371 338.431 79.4869 364.12C40.7533 384.066 -6.57109 356.221 5.27499 310.72C9.84189 293.179 32.9567 283.71 49.2651 291.123C66.8795 299.129 75.7786 323.917 80.1409 341.094C91.8565 387.227 49.0466 418.947 42.2387 461.03C35.8784 500.347 53.9948 529.098 78.3073 558.303C80.3899 560.805 66.8378 559.767 63.4547 559.833C51.0524 560.074 56.6051 562.447 65.9824 562.264C72.0134 562.147 84.8978 565.074 81.3138 557.005C78.728 551.183 77.9286 538.856 77.8004 532.269"
              stroke="#808080"
              stroke-width="6.49254"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
