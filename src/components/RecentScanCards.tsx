"use client";
import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

type Props = {};

const RecentScanCards = (props: Props) => {
  const data = [
    {
      name: "Yeezy",
      totalScans: "37",
    },
    {
      name: "Ty",
      totalScans: "101",
    },
    {
      name: "Travis",
      totalScans: "67",
    },
    {
      name: "Rodeo",
      totalScans: "112",
    },
    {
      name: "Jack",
      totalScans: "43",
    },
    {
      name: "Yeezy",
      totalScans: "666",
    },
    {
      name: "Yeezy",
      totalScans: "666",
    },
    {
      name: "Yeezy",
      totalScans: "666",
    },
    {
      name: "Yeezy",
      totalScans: "666",
    },
    {
      name: "Yeezy",
      totalScans: "666",
    },
  ];
  return (
    <>
      {data.slice(0, 5).map((scan, idx) => (
        <Card
          className="w-full flex flex-row justify-between items-center p-4 mb-3 hover:bg-primary hover:text-primary-foreground hover:cursor-pointer"
          key={idx}
        >
          <div className="text-xl font-semibold">{scan.name}</div>
          <div className="flex flex-row items-center">
            <div className="text-lg mr-1">{scan.totalScans}</div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default RecentScanCards;
