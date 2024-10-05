import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { title } from "process";
import { useState } from "react";
import { cn } from "@/lib/utils";
import HomepageForm from "./HomepageForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import NoQrFound from "./NoQrFound";
import AiUrlTable from "./AiUrlTable";
import HomePageTable from "./HomePageTable";
// import ModalVideo from '@/components/modal-video'

export default function Hero() {
  const [type, setType] = useState("url");
  const dropdownItems = [
    {
      title: "URL",
      item: "url",
    },
    {
      title: "Multi URL",
      item: "multi_url",
    },
    {
      title: "Contact",
      item: "contact",
    },
    {
      title: "Free Text",
      item: "free_text",
    },
  ];
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

      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="flex flex-col pt-6 pb-6 ">
          {/* Section header */}
          <div className="flex justify-center items-center w-full ">
            <div className="flex flex-col justify-center items-center">
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-2"
                data-aos="zoom-y-out"
              >
                No more boring{" "}
                <span className="text-5xl pr-2 md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  QR Codes
                </span>
              </h1>
              <p className="text-2xl font-light text-slate-700 opacity-70">
                Create beautiful <span className="font-bold">dynamic AI</span>{" "}
                generated QR Codes to level up your marketing game.
              </p>
            </div>
          </div>

          {/* Hero image */}
          <div className="w-full mt-4 ">
            <Card className="border-4 border-dashed">
              <Tabs defaultValue="generate" className="w-full">
                <TabsList className="mt-4 ml-4">
                  <TabsTrigger value="generate">Craft QR Codes</TabsTrigger>
                  <TabsTrigger value="get_qr">Your QR Codes</TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="-mt-2">
                  <CardHeader className="flex flex-row items-baseline">
                    <div className="p-2 opacity-75 text-sm">QR Type: </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-muted py-2 text-sm rounded-md outline-none">
                        <div className="flex flex-row justify-between mx-4">
                          {
                            {
                              url: "URL",
                              multi_url: "Multi URL",
                              contact: "Contact",
                              free_text: "Free text",
                            }[type]
                          }
                          <ChevronDown className="w-4 h-4 ml-3" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-12">
                        {dropdownItems.map((dropdownItem, idx) => (
                          <DropdownMenuItem
                            key={idx}
                            onClick={() => {
                              setType(dropdownItem.item);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                type === dropdownItem.item
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {dropdownItem.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row">
                      <div className="flex-[1] border-2 border-slate-400 h-fit p-4 mr-2 rounded-lg ">
                        <HomepageForm qrType={type} />
                      </div>
                      <div className="flex-[2] flex rounded-md border-dashed h-[48rem] border-blue-600 justify-center items-center border-2 ">
                        <div>Hello</div>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>
                <TabsContent value="get_qr">
                  <CardHeader className="flex flex-row items-baseline -mt-4">
                    <div className="p-2 opacity-75 text-sm">QR Type: </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-muted py-2 text-sm rounded-md outline-none">
                        <div className="flex flex-row justify-between mx-4">
                          {
                            {
                              url: "URL",
                              multi_url: "Multi URL",
                              contact: "Contact",
                              free_text: "Free text",
                            }[type]
                          }
                          <ChevronDown className="w-4 h-4 ml-3" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-12">
                        {dropdownItems.map((dropdownItem, idx) => (
                          <DropdownMenuItem
                            key={idx}
                            onClick={() => {
                              setType(dropdownItem.item);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                type === dropdownItem.item
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {dropdownItem.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <HomePageTable qrType={type} />
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 *   Create beautiful <span className="font-bold">dynamic AI</span>{" "}
                generated QR Codes to level up your marketing game.

                 <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-2"
                data-aos="zoom-y-out"
              >
                No more boring{" "}
                <span className="text-5xl pr-2 md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  QR Codes
                </span>
              </h1>
 */
