"use client";
import DownloadButton from "@/components/DownloadButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAiContactQrCode, getAnonAiContactQr } from "@/lib/actions";
import { AiContactQr, AnonymousContactQr } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const AiContactPage = (props: Props) => {
  const [uniqueToken] = props.params.slug;
  const [contactQr, setContactQr] = useState<
    AiContactQr | AnonymousContactQr
  >();
  const [loading, setLoading] = useState(true);

  function isAnonContactQr(
    contact: AiContactQr | AnonymousContactQr
  ): contact is AnonymousContactQr {
    return (contact as AnonymousContactQr).name !== undefined;
  }

  useEffect(() => {
    async function getQrCode() {
      const aiContact = await getAiContactQrCode(uniqueToken);
      const anonContact = await getAnonAiContactQr(uniqueToken);

      if (!aiContact && !anonContact) {
        setLoading(false);
        return;
      }
      if (aiContact) {
        setContactQr(aiContact);
      }
      if (anonContact) {
        setContactQr(anonContact);
      }

      setLoading(false);
    }
    getQrCode();
  }, [uniqueToken]);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      {!loading && !contactQr && (
        <div className="text-3xl">No contact present</div>
      )}
      {contactQr && (
        <Card className=" m-auto mt-8 w-1/3">
          <CardHeader>
            <CardTitle>
              {isAnonContactQr(contactQr) ? contactQr.name : "Contact"}
            </CardTitle>
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
      )}
    </div>
  );
};

export default AiContactPage;
