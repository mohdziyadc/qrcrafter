import DownloadButton from "@/components/DownloadButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prismaClient } from "@/lib/db";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const AiContactPage = async (props: Props) => {
  const [uniqueToken] = props.params.slug;
  const contactQr = await prismaClient.aiContactQr.findUnique({
    where: {
      uniqueToken: uniqueToken,
    },
  });

  if (!contactQr) {
    return (
      <div>
        <h1>No QR Code found</h1>
      </div>
    );
  }
  await prismaClient.qRCodeAnalytics.update({
    where: {
      id: contactQr.qrCodeAnalyticsId,
    },
    data: {
      scanCount: {
        increment: 1,
      },
      lastScanAt: new Date(),
    },
  });

  return (
    <div className="flex justify-center items-center">
      <Card className="m-4 w-1/3">
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="mb-2">First Name: {contactQr.first_name}</div>
            <div className="mb-2">Last Name: {contactQr.last_name}</div>
            <div className="mb-2">Organisation: {contactQr.organisation}</div>
            <div className="mb-2">Email: {contactQr.email}</div>
            <div className="mb-2">Phone: {contactQr.phone_number}</div>
          </div>
        </CardContent>
        <CardFooter>
          {contactQr && <DownloadButton contact={contactQr} />}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AiContactPage;
