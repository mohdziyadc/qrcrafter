"use client";
import LoadingSpinner from "@/app/manage/loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

type Props = {};

// const data = [
//   {
//     name: "Yeezy",
//     Scans: 96,
//   },
//   {
//     name: "Feb",
//     Scans: 12,
//   },
//   {
//     name: "Mar",
//     Scans: 26,
//   },
//   {
//     name: "Apr",
//     Scans: 76,
//   },
//   {
//     name: "May",
//     Scans: 45,
//   },
//   {
//     name: "Jun",
//     Scans: 32,
//   },
//   {
//     name: "Jul",
//     Scans: 51,
//   },
//   {
//     name: "Aug",
//     Scans: 20,
//   },
//   {
//     name: "Sep",
//     Scans: 27,
//   },
//   {
//     name: "Oct",
//     Scans: 66,
//   },
// ];

const QRCodesBarChart = (props: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["qrChartAnalytics"],
    queryFn: async () => {
      const response = await axios.get("/api/analytics/chart");
      return response.data.chartData;
    },
  });
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner component />
      </div>
    );
  }
  console.log(data);
  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="qrName"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            dataKey="scanCount"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            wrapperClassName="rounded-md font-semibold"
            itemStyle={{ color: "#0013de" }}
          />
          <Bar dataKey="scanCount" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default QRCodesBarChart;
