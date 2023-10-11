import { prismaClient } from "@/lib/db";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const MultiQR = async (props: Props) => {
  const [userId] = props.params.slug;
  const multiUrlQr = await prismaClient.multiURLCode.findFirst({
    where: {
      userId: userId,
    },
  });

  return (
    <div>
      <h1>Multi URL Codes</h1>
      {multiUrlQr?.urls.map((url, idx) => (
        <div key={idx}>
          {url} Title: {multiUrlQr.titles[idx]}
        </div>
      ))}
    </div>
  );
};

export default MultiQR;
