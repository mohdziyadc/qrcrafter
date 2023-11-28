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

const DynamicContactQR = async ({ params: { slug } }: Props) => {
  const [uniqueToken] = slug;
  const decodedToken = decodeURIComponent(uniqueToken);
  const contactQR = await prismaClient.dynamicContact.findUnique({
    where: {
      uniqueToken: decodedToken,
    },
  });

  if (!contactQR) {
    return (
      <div>
        <h1>No QR Code Found</h1>
      </div>
    );
  }

  await prismaClient.qRCodeAnalytics.update({
    where: {
      id: contactQR.qrCodeAnalyticsId,
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
          {contactQR ? (
            <div className="flex flex-col">
              <div className="mb-2">First Name: {contactQR.firstName}</div>
              <div className="mb-2">Last Name: {contactQR.lastName}</div>
              <div className="mb-2">Organisation: {contactQR.organisation}</div>
              <div className="mb-2">Email: {contactQR.email}</div>
              <div className="mb-2">Phone: {contactQR.phoneNumber}</div>
            </div>
          ) : (
            <div>No QR found</div>
          )}
        </CardContent>
        <CardFooter>
          {contactQR && <DownloadButton contact={contactQR} />}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DynamicContactQR;
