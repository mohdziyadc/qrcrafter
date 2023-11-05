"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsContent } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import AiUrlTable from "./AiUrlTable";

type Props = {};

const AiQrCodeTab = (props: Props) => {
  const [tab, setTab] = useState("ai_url");
  const dropdownItems = [
    {
      title: "URL QR",
      tab: "ai_url",
    },
    {
      title: "Multi URL QR",
      tab: "ai_multi_url",
    },
    {
      title: "Free Text QR",
      tab: "ai_freetext",
    },
    {
      title: "Contact QR",
      tab: "ai_contact",
    },
  ];
  return (
    <Card>
      <Tabs value={tab}>
        <CardHeader className="font-semibold text-xl w-[250px]">
          <DropdownMenu>
            <DropdownMenuTrigger className=" bg-muted py-2 text-sm w-11/12 rounded-md outline-none ">
              <div className="flex flex-row justify-between mx-4">
                {
                  {
                    ai_url: "URL QR",
                    ai_multi_url: "Multi URL QR",
                    ai_freetext: "Free Text QR",
                    ai_contact: "Contact QR",
                  }[tab]
                }
                <ChevronDown className="w-4 h-4 -mr-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropdownItems.map((dropdownItem, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={() => {
                    setTab(dropdownItem.tab);
                  }}
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
        <TabsContent value="ai_url">
          <CardContent>
            <AiUrlTable />
          </CardContent>
        </TabsContent>
        <TabsContent value="ai_multi_url">
          <CardContent>AI MULTI URL TAB</CardContent>
        </TabsContent>
        <TabsContent value="ai_freetext">
          <CardContent>AI FREETEXT TAB</CardContent>
        </TabsContent>
        <TabsContent value="ai_contact">
          <CardContent>AI CONTACT TAB</CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AiQrCodeTab;
