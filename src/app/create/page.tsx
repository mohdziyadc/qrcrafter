"use client";
import TabsView from "@/components/TabsView";
import { TabsContent } from "@/components/ui/tabs";
import { getAuthSession } from "@/lib/auth";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const CreateQR = (props: Props) => {
  //   const session = await getAuthSession();
  //   if (!session?.user) {
  //     return redirect("/");
  //   }
  return (
    <div className="flex w-full h-screen justify-center items-center">
      {/* <Tabs defaultValue="url" className="w-[600px] space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="multi_url">Multi-URL</TabsTrigger>
          <TabsTrigger value="freetext">Free Text</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="url">Overview Tab</TabsContent>
        <TabsContent value="multi_url">Analytics Tab</TabsContent>
        <TabsContent value="freetext">Reports Tab</TabsContent>
        <TabsContent value="contact">Contacts Tab</TabsContent>
      </Tabs>
      <TabsView /> */}
    </div>
  );
};

export default CreateQR;
