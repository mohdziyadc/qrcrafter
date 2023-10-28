import DynamicURLTable from "@/components/DynamicURLTable";
import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LoadingSpinner from "./loading";
import DynamicQRCard from "@/components/DynamicQRCard";
import MultiURLTable from "@/components/MultiURLTable";
import FreeTextTable from "@/components/FreeTextTable";
import ContactQrTable from "@/components/ContactQrTable";

type Props = {};

const Manage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  // const dynamicQrCodes = await prismaClient.dynamicURL.findMany({
  //   where: {
  //     userId: session.user.id,
  //   },
  //   orderBy: {
  //     id: "asc",
  //   },
  // });
  // control tabs programmatically.
  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-3xl">Your QR Codes</h1>
      {/* <h3 className="font-semibold text-xl mt-8 mb-4">Dynamic URL QR Codes</h3> */}

      <DynamicQRCard
        dynamicURLTable={
          <Suspense fallback={<LoadingSpinner component={true} />}>
            <DynamicURLTable />
          </Suspense>
        }
        multiURLTable={<MultiURLTable />}
        freeTextTable={<FreeTextTable />}
        contactQrTable={<ContactQrTable />}
      />
    </div>
  );
};

export default Manage;
