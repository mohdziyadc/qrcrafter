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
  return data.length !== 0 ? (
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
  ) : (
    <div className="flex justify-center items-center pt-5 font-semibold">
      No QR Codes Found
    </div>
  );
};

export default QRCodesBarChart;
