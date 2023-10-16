import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Manage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const dynamicQrCodes = await prismaClient.dynamicURL.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="flex flex-col">
      {dynamicQrCodes.map((qrCode, idx) => (
        <div key={idx}>{qrCode.qrCode}</div>
      ))}
    </div>
  );
};

export default Manage;
