"use client";
import React, { ReactNode, Suspense, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import LoadingSpinner from "@/app/manage/loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicQRCardProps {
  dynamicURLTable: ReactNode;
  multiURLTable: ReactNode;
  freeTextTable: ReactNode;
  contactQrTable: ReactNode;
}

const DynamicQRCard: React.FC<DynamicQRCardProps> = ({
  dynamicURLTable,
  multiURLTable,
  freeTextTable,
  contactQrTable,
}) => {
  const [tab, setTab] = useState("dynamic_url");

  const dropdownItems = [
    {
      title: "Dynamic URL",
      tab: "dynamic_url",
    },
    {
      title: "Multi URL QR",
      tab: "dynamic_multi_url",
    },
    {
      title: "Free Text QR",
      tab: "dynamic_freetext",
    },
    {
      title: "Contact QR",
      tab: "dynamic_contact",
    },
  ];

  return (
    <div>
      <Card className="mt-4">
        <Tabs className="w-full" value={tab}>
          <CardHeader className="font-semibold text-xl w-[250px]">
            <DropdownMenu>
              <DropdownMenuTrigger className=" bg-muted py-2 text-sm w-11/12 rounded-md outline-none ">
                <div className="flex flex-row justify-between mx-4">
                  {
                    {
                      dynamic_url: "Dynamic URL QR",
                      dynamic_multi_url: "Multi URL QR",
                      dynamic_freetext: "Free Text QR",
                      dynamic_contact: "Contact QR",
                    }[tab]
                  }
                  <ChevronDown className="w-4 h-4 -mr-1" />
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
          <TabsContent value="dynamic_url">
            <CardContent>{dynamicURLTable}</CardContent>
          </TabsContent>
          <TabsContent value="dynamic_multi_url">
            <CardContent>{multiURLTable}</CardContent>
          </TabsContent>
          <TabsContent value="dynamic_freetext">
            <CardContent>{freeTextTable}</CardContent>
          </TabsContent>
          <TabsContent value="dynamic_contact">
            <CardContent>{contactQrTable}</CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DynamicQRCard;
