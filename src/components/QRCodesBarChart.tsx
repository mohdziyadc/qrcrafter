"use client";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import { Button } from "./ui/button";

type Props = {};

const data = [
  {
    name: "Yeezy",
    Scans: 96,
  },
  {
    name: "Feb",
    Scans: 12,
  },
  {
    name: "Mar",
    Scans: 26,
  },
  {
    name: "Apr",
    Scans: 76,
  },
  {
    name: "May",
    Scans: 45,
  },
  {
    name: "Jun",
    Scans: 32,
  },
  {
    name: "Jul",
    Scans: 51,
  },
  {
    name: "Aug",
    Scans: 20,
  },
  {
    name: "Sep",
    Scans: 27,
  },
  {
    name: "Oct",
    Scans: 66,
  },
];

const QRCodesBarChart = (props: Props) => {
  const [tooltip, setTooltip] = useState(false);
  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            dataKey="Scans"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            wrapperClassName="rounded-md font-semibold"
            itemStyle={{ color: "#0013de" }}
          />
          <Bar dataKey="Scans" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default QRCodesBarChart;
