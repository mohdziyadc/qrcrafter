"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import OverviewTab from "./OverviewTab";
import ManageQRCodeButton from "./buttons/ManageQRCodeButton";
import CreateQRNav from "./CreateQRNav";

type Props = {};

const TabsView = (props: Props) => {
  return (
    <Tabs defaultValue="overview" className="space-y-4 ">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>
      <TabsContent value="analytics">Analytics Tab</TabsContent>
      <TabsContent value="reports">Reports Tab</TabsContent>
    </Tabs>
  );
};

export default TabsView;
