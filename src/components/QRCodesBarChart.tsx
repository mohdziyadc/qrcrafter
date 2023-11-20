import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

type Props = {};

const data = [
  {
    name: "Yeezy",
    scans: 96,
  },
  {
    name: "Feb",
    scans: 12,
  },
  {
    name: "Mar",
    scans: 26,
  },
  {
    name: "Apr",
    scans: 76,
  },
  {
    name: "May",
    scans: 45,
  },
  {
    name: "Jun",
    scans: 32,
  },
  {
    name: "Jul",
    scans: 51,
  },
  {
    name: "Aug",
    scans: 20,
  },
  {
    name: "Sep",
    scans: 27,
  },
  {
    name: "Oct",
    scans: 66,
  },
  {
    name: "Nov",
    scans: 30,
  },
  {
    name: "Dec",
    scans: 17,
  },
];

const QRCodesBarChart = (props: Props) => {
  return (
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
          dataKey="scans"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="scans" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default QRCodesBarChart;
