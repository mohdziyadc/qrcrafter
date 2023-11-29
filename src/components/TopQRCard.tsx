import LoadingSpinner from "@/app/manage/loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type Props = {};

const TopQRCard = (props: Props) => {
  const { data: topQrCode, isLoading: isLoadingTopQr } = useQuery({
    queryKey: ["qrTopAnalytics"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/topqr");
      return res.data.topQR;
    },
    retry: false,
  });
  return (
    <div>
      {isLoadingTopQr ? (
        <div>
          <LoadingSpinner component />
        </div>
      ) : topQrCode ? (
        <>
          <div className="text-2xl font-bold">{topQrCode.qrName}</div>
          <p className="text-xs text-muted-foreground">
            {topQrCode.scanCount} total scans
          </p>
        </>
      ) : (
        <div className="flex justify-center items-center pt-5 font-semibold">
          N/A
        </div>
      )}
    </div>
  );
};

export default TopQRCard;
