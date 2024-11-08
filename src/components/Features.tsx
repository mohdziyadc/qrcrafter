"use client";
import React, { useEffect, useRef, useState } from "react";
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
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePostHog } from "posthog-js/react";
import { Button } from "./ui/button";
import WaitlistDialogBox from "./WaitlistDialogBox";
type Props = {};

const Features = (props: Props) => {
  const posthog = usePostHog();
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
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
      qrName: "Coupon Code",
      scanCount: "32",
    },
  ];

  const chartData = [
    {
      qrName: "Event QR",
      scanCount: 80,
    },
    {
      qrName: "Xmas QR",
      scanCount: 100,
    },
    {
      qrName: "Menu QR",
      scanCount: 50,
    },
    {
      qrName: "Coupon #1",
      scanCount: 60,
    },
    {
      qrName: "Socials QR",
      scanCount: 20,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            posthog.capture("feature_page_scrolled", {
              scroll_percent: Math.round(entry.intersectionRatio * 100),
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (featureSectionRef.current) {
      observer.observe(featureSectionRef.current);
    }

    return () => observer.disconnect();
  });

  const ctaBtnHandler = () => {
    setOpenDialog(!openDialog);
    posthog.capture("feature_page_cta_clicked");
  };

  return (
    <section
      ref={featureSectionRef}
      className="relative mb-10  overflow-x-hidden"
    >
      <div className="absolute bottom-0 left-0 right-0 -top-6 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-10%] right-0 top-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] w-[500px] h-[500px]  rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className="absolute left-0 right-0  m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2 sm:hidden"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-5xl mx-auto text-center pb-12 md:pb-16">
            <div className="text-5xl sm:text-6xl font-extrabold mb-4">
              <p>A complete</p>{" "}
              <p className="bg-clip-text text-transparent  bg-gradient-to-br from-pink-600 via-purple-300 to-indigo-500 ">
                {" "}
                QR Code{" "}
                <span className="text-primary underline underline-offset-4">
                  solution
                </span>
              </p>
            </div>
            <p className="md:text-xl text-lg text-center text-primary/90">
              <span className="font-bold">QRCoded</span> is an all-in-one QR
              Code solution. You can create different types of QR Codes specific
              to your needs. Never reprint. You can just change the QR Code
              data.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-12 sm:grid-cols-6  grid-cols-1 gap-6">
          <div className="md:col-span-6 sm:col-span-3 pb-10">
            <div className="flex flex-col mb-4 ">
              <div className="text-4xl font-bold ">
                <span className="bg-clip-text text-transparent  bg-gradient-to-br from-red-500  to-pink-300 ">
                  Powerful
                </span>{" "}
                suite of QR Tools
              </div>
              <div className="text-xl mt-4">
                <span className="font-bold">QRCoded</span> offers you a powerful
                set of QR codes and analytics. Track and manage your QR Codes.
              </div>
            </div>
            <div className="flex flex-col">
              <Card
                className="w-full mb-2  bg-primary-foreground text-secondary"
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

          <div className="md:col-span-6 sm:col-span-3 sm:mt-0 -mt-8 flex flex-col">
            <Card
              className="w-full flex-[1] bg-primary/90"
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
                  <div className="relative mt-4">
                    <Menubar className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 h-fit ">
                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center border-2 lg:border-0 border-white">
                          URL QR
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            When scanned, this QR code would redirect to a URL.
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>

                      <Separator
                        orientation="vertical"
                        className="absolute h-4 hidden lg:block left-1/4 bg-slate-300"
                      />

                      <MenubarMenu>
                        <MenubarTrigger className="flex justify-center border-2 lg:border-0 col-span-1 border-white">
                          Multi URL QR
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            When scanned, this QR code would show a list of
                            URLs.
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <Separator
                        orientation="vertical"
                        className="absolute h-4  hidden lg:block left-[50%] bg-slate-300"
                      />

                      <MenubarMenu>
                        <MenubarTrigger className=" flex justify-center col-span-1 border-2 mt-1 lg:mt-0 lg:border-0 border-white">
                          Free Text QR
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            When scanned, this QR code would show the embedded
                            text.
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                      <Separator
                        orientation="vertical"
                        className="absolute h-4  hidden lg:block left-[75%] bg-slate-300"
                      />

                      <MenubarMenu>
                        <MenubarTrigger className=" flex justify-center col-span-1 border-2 mt-1 lg:mt-0 lg:border-0 border-white">
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
            <div className="flex-[3.5] mt-4 mb-6">
              <Card className="w-full bg-secondary-foreground">
                <CardContent>
                  <div className="flex flex-col">
                    <div className="mt-4 text-xl font-semibold text-primary-foreground">
                      Powerful Analytics
                    </div>
                    <div className="text-lg mt-2 text-primary-foreground">
                      Get insights from your QR Codes.
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Top QR code
                          </CardTitle>
                          <QrCodeIcon className="h-6 w-6" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Sale Promo</div>
                          <p className="text-xs text-muted-foreground">
                            767 total scans
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total Scans
                          </CardTitle>
                          <LineChartIcon className="h-6 w-6 ml-2" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1901</div>
                          <p className="text-xs text-muted-foreground">
                            Total scan count of all your QR&apos;s.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-5 gap-2 mt-2">
                      <Card className="sm:col-span-1 lg:col-span-2">
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
                      <Card className="sm:col-span-1 lg:col-span-3">
                        <CardHeader>
                          <CardTitle>QR Charts</CardTitle>
                          <CardDescription>
                            View top QR codes with their scans
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex p-0 justify-center items-center ">
                          {/* <Image src={ChartImage} alt="chart" />
                           */}
                          <ResponsiveContainer
                            className="mr-2 -ml-4"
                            width="100%"
                            height={200}
                          >
                            <BarChart data={chartData}>
                              <XAxis
                                dataKey="qrName"
                                stroke="#888888"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                              />
                              <YAxis
                                stroke="#888888"
                                dataKey="scanCount"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                              />
                              <Tooltip
                                wrapperClassName="rounded-md text-primary-foreground font-semibold"
                                itemStyle={{ color: "#0013de" }}
                              />
                              <Bar
                                dataKey="scanCount"
                                fill="#2563eb"
                                radius={[4, 4, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky flex justify-center z-10">
        <Button
          className=" sm:w-[200px] w-[250px] mb-4"
          onClick={ctaBtnHandler}
        >
          <div className="flex justify-between items-center">
            <div>Get QRCoded</div>
            <div className="ml-4 -mr-4">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </Button>
      </div>
      <WaitlistDialogBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </section>
  );
};

export default Features;
