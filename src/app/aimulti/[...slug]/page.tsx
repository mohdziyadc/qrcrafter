"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAiMultiUrlQrcode, getAnonAiMultiUrl } from "@/lib/actions";
import { AnonymousMultiUrlQr, MulitUrlAiQr } from "@prisma/client";
import { Link2, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const AiMultiQrPage = (props: Props) => {
  const [uniqueToken] = props.params.slug;
  const [multiUrlQr, setMultiUrlQr] = useState<
    MulitUrlAiQr | AnonymousMultiUrlQr
  >();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMultiUrlQrCode() {
      const multiUrl = await getAiMultiUrlQrcode(uniqueToken);
      const anonMultiUrl = await getAnonAiMultiUrl(uniqueToken);

      if (!multiUrl && !anonMultiUrl) {
        setLoading(false);
        return;
      }
      if (multiUrl) {
        setMultiUrlQr(multiUrl);
      }
      if (anonMultiUrl) {
        setMultiUrlQr(anonMultiUrl);
      }

      setLoading(false);
    }
    getMultiUrlQrCode();
  }, [uniqueToken]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {loading && <Loader2 className=" animate-spin h-12 w-12" />}
      {!loading && !multiUrlQr && (
        <div className="text-3xl">No URLS present</div>
      )}

      {multiUrlQr && (
        <Card className="px-10 py-5 rounded-md">
          <div className="flex justify-center items-center">
            <h1 className="font-bold text-lg">{multiUrlQr.name}</h1>
          </div>
          {multiUrlQr?.urls.map((url, idx) => (
            <CardContent
              key={idx}
              className="px-4 py-2 bg-primary text-primary-foreground border-2 border-black m-2 rounded-md w-[200px] flex justify-center items-center"
            >
              <Link2 className="h-4 w-4 mr-2 " />
              <Link className="underline-offset-4 underline" href={url}>
                {multiUrlQr.titles[idx]}
              </Link>
            </CardContent>
          ))}
        </Card>
      )}
    </div>
  );
};

export default AiMultiQrPage;
