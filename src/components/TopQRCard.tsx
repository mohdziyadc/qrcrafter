import LoadingSpinner from "@/app/manage/loading";
import { QRCodeAnalytics } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const TopQRCard = (props: Props) => {
  const {
    data,
    isLoading: isLoadingTopQr,
    isSuccess,
  } = useQuery({
    queryKey: ["qrTopAnalytics"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/topqr");
      return res.data.topQR;
    },
    retry: false,
  });
  const [topQrCode, setTopQrCode] = useState<QRCodeAnalytics>();
  useEffect(() => {
    if (isSuccess) {
      setTopQrCode(data);
    }
  }, []);
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
