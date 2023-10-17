import DynamicURLTable from "@/components/DynamicURLTable";
import SavedQRCode from "@/components/DynamicURLTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { Edit2 } from "lucide-react";
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
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-3xl">Your QR Codes</h1>
      {/* <h3 className="font-semibold text-xl mt-8 mb-4">Dynamic URL QR Codes</h3> */}
      <Card className="mt-4">
        <CardHeader className="font-semibold text-xl">
          Dynamic URL QR Codes
        </CardHeader>
        <CardContent>
          <DynamicURLTable qrCodes={dynamicQrCodes} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Manage;
