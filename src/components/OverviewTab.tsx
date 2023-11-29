import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FlameIcon, LineChartIcon, QrCodeIcon } from "lucide-react";
import QRCodesBarChart from "./QRCodesBarChart";
import RecentScanCards from "./RecentScanCards";
import { Button } from "./ui/button";
import ManageQRCodeButton from "./buttons/ManageQRCodeButton";
import CreateQRNav from "./CreateQRNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";

type Props = {};

const OverviewTab = (props: Props) => {
  const { data: totalScans, isLoading: isLoadingTotalScans } = useQuery({
    queryKey: ["qrTotalScanAnalytics"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/totalscans");
      return res.data.totalScans;
    },
  });

  const { data: topQrCode, isLoading: isLoadingTopQr } = useQuery({
    queryKey: ["qrTopAnalytics"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/topqr");
      return res.data.topQR;
    },
  });
  return (
    <>
      <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <LineChartIcon className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            {isLoadingTotalScans ? (
              <div>
                <LoadingSpinner component />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {totalScans._sum.scanCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top QR code</CardTitle>
            <QrCodeIcon className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            {isLoadingTopQr ? (
              <div>
                <LoadingSpinner component />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{topQrCode.qrName}</div>
                <p className="text-xs text-muted-foreground">
                  {topQrCode.scanCount} total scans
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hottest QR code
            </CardTitle>
            <FlameIcon className="h-6 w-6" color="#e11d48" fill="#e11d48" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rodeo</div>
            <p className="text-xs text-muted-foreground">
              +100 scans from last month
            </p>
          </CardContent>
        </Card>
        <div className="flex flex-row justify-center lg:justify-end col-span-2 ">
          <ManageQRCodeButton />
          <CreateQRNav />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2 ">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>QR Charts</CardTitle>
            <CardDescription>
              Showing top 10 QR codes with their scans
            </CardDescription>
          </CardHeader>

          <CardContent className="pl-2">
            <QRCodesBarChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentScanCards />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
