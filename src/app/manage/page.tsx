import DynamicURLTable from "@/components/DynamicURLTable";
import SavedQRCode from "@/components/DynamicURLTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { Edit2 } from "lucide-react";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import LoadingSpinner from "./loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-3xl">Your QR Codes</h1>
      {/* <h3 className="font-semibold text-xl mt-8 mb-4">Dynamic URL QR Codes</h3> */}
      <Card className="mt-4">
        <Tabs defaultValue="dynamic_url" className="w-full">
          <CardHeader className="font-semibold text-xl w-[200px]">
            <TabsList>
              <Select defaultValue="dynamic_url">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="dynamic_url">
                      <TabsTrigger value="dynamic_url">
                        Dynamic URL QR
                      </TabsTrigger>
                    </SelectItem>
                    <SelectItem value="dynamic_multi_url">
                      <TabsTrigger value="dynamic_multi_url">
                        Multi Dynamic URL
                      </TabsTrigger>
                    </SelectItem>
                    <SelectItem value="dynamic_freetext">
                      <TabsTrigger value="dynamic_freetext">
                        Free Text QR
                      </TabsTrigger>
                    </SelectItem>
                    <SelectItem value="dynamic_contact">
                      <TabsTrigger value="dynamic_contact">
                        Contact QR
                      </TabsTrigger>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TabsList>
          </CardHeader>
          <TabsContent value="dynamic_url">
            <Suspense fallback={<LoadingSpinner component={true} />}>
              <CardContent>
                <DynamicURLTable qrCodes={dynamicQrCodes} />
              </CardContent>
            </Suspense>
          </TabsContent>
          <TabsContent value="dynamic_multi_url">Multi Dynamic Tab</TabsContent>
          <TabsContent value="dynamic_freetext">Free Text QR Tab</TabsContent>
          <TabsContent value="dynamic_contact">
            Contact Dynamic QR Tab
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Manage;
