import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LineChartIcon, QrCodeIcon } from "lucide-react";

type Props = {};

const OverviewTab = (props: Props) => {
  return (
    <>
      <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <LineChartIcon className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">666</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top QR code</CardTitle>
            <QrCodeIcon className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Yeezy</div>
            <p className="text-xs text-muted-foreground">
              +100 scans from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2 ">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>{/* <RecentSales /> */}</CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
