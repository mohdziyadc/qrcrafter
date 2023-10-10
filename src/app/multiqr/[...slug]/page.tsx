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
    include: {
      urls: true,
    },
  });
  return multiUrlQr?.urls.map((url, index) => <div key={index}>{url.url}</div>);
};

export default MultiQR;
