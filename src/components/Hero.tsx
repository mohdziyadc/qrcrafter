import { Card, CardContent, CardHeader } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Check, ChevronDown, MoveRightIcon } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import HomepageForm from "./HomepageForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DynamicAIQRCodeCard from "./DynamicAIQRCodeCard";
import HomepageCTA from "./HomepageCTA";
import { usePostHog } from "posthog-js/react";
import clsx from "clsx";
import HomePageTable from "./HomePageTable";

type Props = {
  ref: React.RefObject<HTMLDivElement>;
};

const Hero = forwardRef<HTMLDivElement, Props>((_, ref) => {
  const [type, setType] = useState("url");
  const posthog = usePostHog();

  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleScroll = () => {
      console.log("Handle scroll called");

      if (scrollContainerRef.current) {
        if (scrollContainerRef.current.scrollLeft > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
        capture: true,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <section className="relative z-10  w-full">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          {/* Hero content */}
          <div className="flex flex-col pt-6 pb-6 ">
            {/* Section header */}
            <div className="flex justify-center items-center w-full ">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl flex flex-col justify-center items-center md:items-baseline md:flex-row md:text-6xl font-extrabold leading-tighter tracking-tighter mb-3">
                  No more boring
                  <span className="text-5xl ml-2 pr-2 md:text-6xl font-extrabold leading-tighter tracking-tighter  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    QR Codes
                  </span>
                </h1>

                <p
                  data-aos="zoom-y-out"
                  className="md:text-2xl text-xl max-w-xl text-center font-light text-primary mb-2 opacity-70"
                >
                  Create stunning <span className="font-bold">dynamic AI</span>{" "}
                  generated QR Codes with scan analytics to level up your QR
                  game.
                </p>
              </div>
            </div>

            {/* Hero image */}
            <div className="w-full mt-4 " ref={ref}>
              <Card className="border-4 border-primary border-dashed">
                <Tabs defaultValue="generate" className="w-full">
                  <TabsList className="mt-4 ml-4">
                    <TabsTrigger value="generate">
                      Create AI QR Codes
                    </TabsTrigger>
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
                      <div className="grid lg:grid-cols-3 grid-cols-1">
                        <div className="lg:col-span-1 mb-4 flex-col">
                          <div className=" border-2 border-slate-400 h-fit p-4 mr-2 rounded-lg ">
                            <HomepageForm qrType={type} />
                          </div>
                          <div className="lg:block hidden">
                            <HomepageCTA />
                          </div>
                        </div>

                        <div className="lg:col-span-2 flex rounded-md border-dashed h-[48rem] border-blue-600 justify-center items-center border-2 ">
                          <DynamicAIQRCodeCard isHomepage />
                        </div>
                      </div>
                      <div className="lg:hidden block">
                        <HomepageCTA />
                      </div>
                    </CardContent>
                  </TabsContent>
                  <TabsContent value="get_qr">
                    <CardHeader className="flex flex-row items-baseline justify-between -mt-4">
                      <div className="flex flex-row ">
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
                      </div>
                      <div>
                        <div
                          className={clsx(
                            `flex justify-center text-xs items-center sm:hidden opacity-100 transition-opacity duration-300`,
                            {
                              "opacity-0": isScrolled,
                            }
                          )}
                        >
                          Scroll to edit
                          <MoveRightIcon className="h-6 w-6 ml-2 " />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="min-h-screen">
                      <HomePageTable qrType={type} ref={scrollContainerRef} />
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

Hero.displayName = "Hero";
export default Hero;
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
