import TabsView from "@/components/TabsView";
import UserAccountNav from "@/components/UserAccountNav";
import ManageQRCodeButton from "@/components/buttons/ManageQRCodeButton";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { getAuthSession } from "@/lib/auth";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PlusCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import CreateQRNav from "@/components/CreateQRNav";

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div>
      <div className="max-w-full px-6 py-4 flex justify-between">
        <div className=" font-bold text-4xl">QRboard</div>
        <div>
          <UserAccountNav user={session!.user} />
        </div>
      </div>
      <div className="mx-6 my-4 grid grid-cols-1 ">
        <TabsView />
      </div>
    </div>
  );
};

export default Dashboard;
