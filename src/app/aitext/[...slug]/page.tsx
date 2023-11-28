import { Card, CardContent } from "@/components/ui/card";
import { prismaClient } from "@/lib/db";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const AiFreetextPage = async (props: Props) => {
  const [uniqueToken] = props.params.slug;
  const freeTextQR = await prismaClient.aiFreeTextQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });
  if (!freeTextQR) {
    return <div>No QR Code found</div>;
  }
  await prismaClient.qRCodeAnalytics.update({
    where: {
      id: freeTextQR.qrCodeAnalyticsId,
    },
    data: {
      scanCount: {
        increment: 1,
      },
      lastScanAt: new Date(),
    },
  });
  return (
    <div>
      <Card className="m-4 p-4">
        <CardContent>{freeTextQR.freetext}</CardContent>
      </Card>
    </div>
  );
};

export default AiFreetextPage;
