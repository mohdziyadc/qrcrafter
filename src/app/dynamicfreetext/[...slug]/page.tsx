import { Card, CardContent } from "@/components/ui/card";
import { prismaClient } from "@/lib/db";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const FreeTextQR = async (props: Props) => {
  const [uniqueToken] = props.params.slug;
  const decodedToken = decodeURIComponent(uniqueToken);
  const freeTextQR = await prismaClient.dynamicFreeText.findUnique({
    where: {
      uniqueToken: decodedToken,
    },
  });
  return freeTextQR ? (
    <div>
      <Card className="m-4 p-4">
        <CardContent>{freeTextQR.freetext}</CardContent>
      </Card>
    </div>
  ) : (
    <div>{uniqueToken}</div>
  );
};

export default FreeTextQR;
