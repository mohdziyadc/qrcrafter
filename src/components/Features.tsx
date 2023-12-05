"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { Separator } from "./ui/separator";
import { ArrowRight, LineChartIcon, QrCodeIcon } from "lucide-react";
import Image from "next/image";
import ChartImage from "public/qrChart_img.png";
import { Button } from "./ui/button";
type Props = {};

const Features = (props: Props) => {
  const recentScans = [
    {
      qrName: "Xmas Promo",
      scanCount: "67",
    },
    {
      qrName: "Offers",
      scanCount: "91",
    },
    {
      qrName: "Cute Shoes",
      scanCount: "32",
    },
  ];
  return (
    <section className="relative">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-10 hidden sm:block"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="1080"
          viewBox="0 0 1360 1080"
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
            <circle cx="1232" cy="900" r="128" />
            <circle cx="105" cy="142" r="96" />
          </g>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1132" cy="232" r="192" />
            <circle cx="32" cy="678" r="32" />
          </g>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="656" cy="412" r="128" />
            <circle cx="100" cy="898" r="96" />
          </g>
        </svg>
      </div>
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
              A complete{" "}
              <span className="bg-clip-text text-transparent  bg-gradient-to-br from-pink-600 via-purple-300 to-indigo-500 ">
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
          <div className="col-span-6 pb-10">
            <div className="flex flex-col mb-4 ">
              <div className="text-4xl font-bold ">
                <span className="bg-clip-text text-transparent  bg-gradient-to-br from-red-500  to-pink-300 ">
                  Powerful
                </span>{" "}
                suite of QR Tools
              </div>
              <div className="text-xl mt-4">
                <span className="font-bold">QRCrafter</span> offers you a
                powerful set of QR codes and analytics. Track and manage your QR
                Codes.
              </div>
            </div>
            <div className="flex flex-col">
              <Card
                className="w-full mb-2 bg-primary text-secondary"
                data-aos="zoom-y-out"
              >
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
            <Card
              className="w-full flex-[1] bg-secondary-foreground/80"
              data-aos="zoom-y-out"
            >
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
                        <MenubarContent>
                          <MenubarItem>
                            When scanned, this QR code would redirect to a URL.
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <Separator orientation="vertical" />
                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center">
                          Multi URL QR
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            When scanned, this QR code would show a list of
                            URLs.
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <Separator orientation="vertical" />

                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center">
                          Free Text QR
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            When scanned, this QR code would show the embedded
                            text.
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <Separator orientation="vertical" />

                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center">
                          Contact QR
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            When scanned, this QR code would lead to a
                            downloadable contact.
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex-[3.5] mt-4">
              <Card className="w-full bg-secondary-foreground">
                <CardContent>
                  <div className="flex flex-col">
                    <div className="mt-4 text-xl font-semibold text-primary-foreground">
                      Powerful Analytics
                    </div>
                    <div className="text-lg mt-2 text-primary-foreground">
                      Get insights from your QR Codes.
                    </div>
                    <div className="grid grid-rows-1 gap-2 mt-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Top QR code
                              </CardTitle>
                              <QrCodeIcon className="h-6 w-6" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                Sale Promo
                              </div>
                              <p className="text-xs text-muted-foreground">
                                767 total scans
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                        <div>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Total Scans
                              </CardTitle>
                              <LineChartIcon className="h-6 w-6" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">1901</div>
                              <p className="text-xs text-muted-foreground">
                                Total scan count of all your QR&apos;s.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <Card>
                            <CardHeader>
                              <CardTitle>Recent Scans</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {recentScans.map((scan, idx) => (
                                <Card
                                  className="w-full flex flex-row justify-between items-center p-3.5 mb-2 hover:bg-primary hover:text-primary-foreground hover:cursor-pointer"
                                  key={idx}
                                >
                                  <div className="text-xs font-semibold">
                                    {scan.qrName}
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <div className="text-xs mr-1">
                                      {scan.scanCount}
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                        <div className="col-span-2">
                          <Card>
                            <CardHeader>
                              <CardTitle>QR Charts</CardTitle>
                              <CardDescription>
                                Showing top 10 QR codes with their scans
                              </CardDescription>
                            </CardHeader>

                            <CardContent>
                              <Image
                                src={ChartImage}
                                alt="chart"
                                style={{ objectFit: "contain" }}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
