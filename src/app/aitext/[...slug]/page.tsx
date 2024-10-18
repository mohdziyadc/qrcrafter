"use client";
import { Card, CardContent } from "@/components/ui/card";
import { getAiFreetextQr, getAnonAiFreetextQr } from "@/lib/actions";
import { prismaClient } from "@/lib/db";
import { AiFreeTextQr, AnonymousFreetextQr } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const AiFreetextPage = (props: Props) => {
  const [uniqueToken] = props.params.slug;
  const [freetextQr, setFreetextQr] = useState<
    AiFreeTextQr | AnonymousFreetextQr
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFreetextQr() {
      const aiFreetext = await getAiFreetextQr(uniqueToken);
      const anonFreetext = await getAnonAiFreetextQr(uniqueToken);

      if (!aiFreetext && !anonFreetext) {
        setLoading(false);
        return;
      }
      if (aiFreetext) {
        setFreetextQr(aiFreetext);
      }
      if (anonFreetext) {
        setFreetextQr(anonFreetext);
      }
      setLoading(false);
    }
    getFreetextQr();
  }, [uniqueToken]);

  function isAiFreetext(
    qrcode: AiFreeTextQr | AnonymousFreetextQr
  ): qrcode is AiFreeTextQr {
    return (qrcode as AiFreeTextQr).freetext !== undefined;
  }

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      {!loading && !freetextQr && (
        <div className="flex justify-center items-center h-screen">
          <p>No Text Found</p>
        </div>
      )}
      {freetextQr && (
        <Card className="m-4 p-4">
          <CardContent>
            {isAiFreetext(freetextQr)
              ? freetextQr.freetext
              : freetextQr.free_text}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AiFreetextPage;
