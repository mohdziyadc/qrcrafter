import { Button } from "./ui/button";
import HeroImage from "public/qrcrafter_hero.png";
import Image from "next/image";
// import ModalVideo from '@/components/modal-video'

export default function Hero() {
  return (
    <section className="relative  w-full md:h-screen">
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
          <div className="flex-[1] -mt-16 sm:mt-0  pb-12 md:pb-16">
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
                className="text-xl text-gray-600 mb-8 text-center sm:text-left"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Create beautiful <span className="font-bold">dynamic AI</span>{" "}
                generated QR Codes to level up your marketing game.
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
      </div>
    </section>
  );
}
