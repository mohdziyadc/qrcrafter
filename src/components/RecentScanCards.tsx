"use client";
import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import { QRCodeAnalytics } from "@prisma/client";

type Props = {};

const RecentScanCards = (props: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["qrRecentScanAnalytics"],
    queryFn: async (): Promise<QRCodeAnalytics[]> => {
      const res = await axios.get("/api/analytics/recent");
      return res.data.recentScans;
    },
  });
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner component />
      </div>
    );
  }
  return (
    <>
      {data?.map((scan, idx) => (
        <Card
          className="w-full flex flex-row justify-between items-center p-4 mb-3 hover:bg-primary hover:text-primary-foreground hover:cursor-pointer"
          key={idx}
        >
          <div className="text-xl font-semibold">{scan.qrName}</div>
          <div className="flex flex-row items-center">
            <div className="text-lg mr-1">{scan.scanCount}</div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default RecentScanCards;
