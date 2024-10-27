"use client";
import React from "react";
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

type Props = {};

const UseCase = (props: Props) => {
  return (
    <section className="relative ">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,_#000_40%,_#2dd4bf_100%)]"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-5xl font-extrabold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                Why do I need QRCrafter?
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
        <Button className=" sm:w-[200px] w-[250px] mb-4">
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

export default UseCase;
