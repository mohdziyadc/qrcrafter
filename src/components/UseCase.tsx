"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ArrowRight,
  BadgeDollarSignIcon,
  BuildingIcon,
  CalendarDaysIcon,
  PlaneIcon,
  ShoppingCartIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePostHog } from "posthog-js/react";
import WaitlistDialogBox from "./WaitlistDialogBox";

type Props = {};

const UseCase = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const posthog = usePostHog();

  const ctaBtnClickHandler = () => {
    setOpenDialog(!openDialog);
    posthog.capture("usecase_cta_btn_clicked");
  };
  return (
    <section className="relative ">
      <div className="absolute top-0 -z-10 h-full w-full ">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className=" h-full w-full ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-5xl font-extrabold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-violet-400">
                Why do I need QRCoded?
              </span>
            </h1>
            <p className="text-xl text-center text-primary/90">
              Did you know that <span className="font-bold">57%</span> of
              consumers are more likely to engage with a brand&apos;s digital
              content after scanning a QR code?
            </p>
            <p className="text-xl mt-4 text-center text-primary/90">
              Just imagine if it was{" "}
              <span className="font-bold">beautiful</span> to look at.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-6 pb-20 gap-4">
          <Card>
            <CardHeader>
              <div className="flex flex-row">
                <ShoppingCartIcon className="w-6 h-6 mr-2" />
                <CardTitle>Retail & E-Commerce</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              Embed dynamic QR codes on product tags for real-time promotions,
              discounts, or product information updates. Drive customer
              engagement and boost sales through targeted and adaptive marketing
              campaigns.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-row">
                <CalendarDaysIcon className="w-6 h-6 mr-2" />
                <CardTitle>Events & Conferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              Create dynamic QR codes for event tickets or badges with updated
              schedules, speaker details, or last-minute changes. Enhance
              attendee experience and streamline event management.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex flex-row">
                <BadgeDollarSignIcon className="w-6 h-6 mr-2" />
                <CardTitle>Marketing Agencies</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              Craft dynamic QR codes for client&apos;s marketing collateral,
              enabling real-time campaign adjustments, A/B testing, and
              personalized content delivery. Provide measurable and dynamic
              marketing solutions.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-row">
                <PlaneIcon className="w-6 h-6 mr-2" />
                <CardTitle>Travel & Tourism</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              Generate dynamic QR codes for travel itineraries with real-time
              updates on flight details, hotel information, or local
              attractions. Enhance the travel experience and provide
              flexibility.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex flex-row">
                <UtensilsCrossedIcon className="w-6 h-6 mr-2" />
                <CardTitle>Restaurants & Hospitality</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              Generate dynamic QR codes for menus, allowing quick updates for
              specials, pricing changes, or seasonal offerings. Improve customer
              experience and operational efficiency with beautiful QR codes.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex flex-row">
                <BuildingIcon className="w-6 h-6 mr-2" />
                <CardTitle>Real Estate</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              Integrate dynamic QR codes in property listings for instant
              updates on open house details, pricing changes, or virtual tours.
              Streamline communication with potential buyers and sellers.
            </CardContent>
          </Card>
        </div>
      </div>
      <div className=" absolute left-1/2 transform -translate-x-1/2 bottom-0   z-10">
        <Button
          className=" sm:w-[200px] w-[250px] mb-4"
          onClick={ctaBtnClickHandler}
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

export default UseCase;
