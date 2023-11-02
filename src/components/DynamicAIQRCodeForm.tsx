"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import AiURLForm from "./AiURLForm";
import { useMutation } from "@tanstack/react-query";
import AiMultiUrlForm from "./AiMultiUrlForm";

type Props = {};

const DynamicAIQRCodeForm = (props: Props) => {
  const [tab, setTab] = useState("url");
  const dropdownItems = [
    {
      title: "URL",
      tab: "url",
    },
    {
      title: "Multi URL",
      tab: "multi_url",
    },
    {
      title: "Free Text",
      tab: "freetext",
    },
    {
      title: "Contact",
      tab: "contact",
    },
  ];

  return (
    <div className="flex flex-1">
      <Card className=" mt-2 w-full">
        <Tabs className="w-full" value={tab}>
          <CardHeader className=" flex flex-row items-baseline font-semibold text-xl">
            <p className=" font-normal text-base">Type: </p>
            <DropdownMenu>
              <DropdownMenuTrigger className=" ml-2 bg-muted py-2 text-sm w-fit rounded-md outline-none ">
                <div className="flex flex-row justify-between items-center mx-4">
                  {
                    {
                      url: dropdownItems[0].title,
                      multi_url: dropdownItems[1].title,
                      freetext: dropdownItems[2].title,
                      contact: dropdownItems[3].title,
                    }[tab]
                  }
                  <ChevronDown className="w-4 h-4 ml-2 -mr-1" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dropdownItems.map((dropdownItem, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    onClick={() => setTab(dropdownItem.tab)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        tab === dropdownItem.tab ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {dropdownItem.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <TabsContent value="url">
            <CardContent>
              <AiURLForm />
            </CardContent>
          </TabsContent>
          <TabsContent value="multi_url">
            <CardContent>
              <AiMultiUrlForm />
            </CardContent>
          </TabsContent>
          <TabsContent value="freetext">
            <CardContent>Free Text Form</CardContent>
          </TabsContent>
          <TabsContent value="contact">
            <CardContent>Contact Form</CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DynamicAIQRCodeForm;
