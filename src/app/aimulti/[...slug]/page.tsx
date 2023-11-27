import { prismaClient } from "@/lib/db";
import { Link2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const AiMultiQrPage = async (props: Props) => {
  const [uniqueToken] = props.params.slug;
  const multiUrlQr = await prismaClient.mulitUrlAiQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
  if (!multiUrlQr) {
    return <div>No URLS present</div>;
  }
  await prismaClient.qRCodeAnalytics.update({
    where: {
      id: multiUrlQr?.qrCodeAnalyticsId,
    },
    data: {
      scanCount: {
        increment: 1,
      },
      lastScanAt: new Date(),
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-gray-200 p-10 rounded-md">
        {multiUrlQr?.urls.map((url, idx) => (
          <div
            key={idx}
            className="px-4 py-2 border-2 border-black m-2 rounded-md w-[200px] flex justify-center items-center"
          >
            <Link2 className="h-4 w-4 mr-2 " />
            <Link className="underline-offset-4 underline" href={url}>
              {multiUrlQr.titles[idx]}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiMultiQrPage;
