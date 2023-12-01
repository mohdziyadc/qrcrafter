import React from "react";
import { Card, CardContent } from "./ui/card";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { Separator } from "./ui/separator";

type Props = {};

const Features = (props: Props) => {
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
              stroke-width="6.49254"
              stroke-linecap="round"
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
              A complete{" "}
              <span className="bg-clip-text text-transparent  bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 ">
                {" "}
                QR Code
              </span>{" "}
              <span className=" underline underline-offset-4">solution</span>.
            </h1>
            <p className="text-xl line-clamp-2 text-gray-600">
              <span className="font-bold">QRCrafter</span> is an all-in-one QR
              Code solution. You can create different types of QR Codes specific
              to your needs. Never reprint. You can just change the QR Code
              data.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 pb-12">
            <div className="flex flex-col mb-4 ">
              <div className="text-4xl font-bold ">
                Powerful suite of QR Tools
              </div>
              <div className="text-xl mt-4">
                <span className="font-bold">QRCrafter</span> offers you a
                powerful set of QR codes and analytics. Track and manage your QR
                Codes.
              </div>
            </div>
            <div className="flex flex-col">
              <Card className="w-full mb-2" data-aos="zoom-y-out">
                <CardContent>
                  <div className="flex flex-col p-4">
                    <div className="font-bold text-xl">Dynamic AI QR Codes</div>
                    <div className="text-lg mt-2">
                      Dynamic AI-generated QR codes are beautiful QR codes that
                      make anybody scan them. Instantly update content, track
                      engagements, and enhance user experiences. Stay ahead of
                      the curve using analytics from these QR codes.
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full mb-2" data-aos="zoom-y-out">
                <CardContent>
                  <div className="flex flex-col p-4">
                    <div className="font-bold text-xl">Dynamic QR Codes</div>
                    <div className="text-lg mt-2">
                      Dynamic QR codes empower your brand with versatility. Make
                      editable QR code that allows real-time content updates.
                      It&apos;s ideal for promotions or dynamic scenarios. Use
                      analytics to gain deeper insights to these QR Codes.
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-full mb-2" data-aos="zoom-y-out">
                <CardContent>
                  <div className="flex flex-col p-4">
                    <div className="font-bold text-xl">Static QR Codes</div>
                    <div className="text-lg mt-2">
                      Static QR codes store fixed information, like a website
                      link. They don&apos;t change, providing a consistent,
                      straightforward means of sharing specific content.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="col-span-6 flex flex-col">
            <Card className="w-full flex-[1] bg-primary" data-aos="zoom-y-out">
              <CardContent>
                <div className="flex flex-col ">
                  <div className="mt-4 text-xl font-semibold text-primary-foreground ">
                    Various Types of QR Codes
                  </div>
                  <div className="text-lg mt-2 text-primary-foreground">
                    Choose the type of QR Code specific to your needs.
                  </div>
                  <div>
                    <Menubar className="flex flex-row justify-evenly mt-6">
                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center">
                          URL QR
                        </MenubarTrigger>
                      </MenubarMenu>
                      <Separator orientation="vertical" />
                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center">
                          Multi URL QR
                        </MenubarTrigger>
                      </MenubarMenu>
                      <Separator orientation="vertical" />

                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center">
                          Free Text QR
                        </MenubarTrigger>
                      </MenubarMenu>
                      <Separator orientation="vertical" />

                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center">
                          Contact QR
                        </MenubarTrigger>
                      </MenubarMenu>
                    </Menubar>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex-[3.5] mt-4">
              <Card className="w-full">
                <CardContent>Powerful Analytics</CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;