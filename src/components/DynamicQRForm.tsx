import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DynamicURLForm from "./DynamicURLForm";
import DynamicMultiURLForm from "./DynamicMultiURLForm";
import DynamicFreeTextForm from "./DynamicFreeTextForm";
import DynamicContactForm from "./DynamicContactForm";

type Props = {};

const DynamicQRForm = (props: Props) => {
  const [tab, setTab] = useState("dynamic_url");
  const [showDialog, setShowDialog] = useState(false);
  const [tabValue, setTabValue] = useState("");
  const [content, setContent] = useState(false);
  const handleTabChange = (value: string) => {
    if (content) {
      setShowDialog(true);
      setTabValue(value);
    } else {
      setTab(value);
    }
  };
  return (
    <>
      <Tabs
        value={tab}
        onValueChange={handleTabChange}
        className="max-h-screen"
      >
        <TabsList className="grid grid-cols-4 gap-2 w-full">
          <TabsTrigger value="dynamic_url">URL</TabsTrigger>
          <TabsTrigger value="dynamic_multi_url">Multi-URL</TabsTrigger>
          <TabsTrigger value="dynamic_freetext">Free Text</TabsTrigger>
          <TabsTrigger value="dynamic_contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="dynamic_url" tabIndex={-1}>
          <DynamicURLForm isContent={content} setIsContent={setContent} />
        </TabsContent>
        <TabsContent value="dynamic_multi_url">
          <DynamicMultiURLForm isContent={content} setIsContent={setContent} />
        </TabsContent>
        <TabsContent value="dynamic_freetext">
          <DynamicFreeTextForm isContent={content} setIsContent={setContent} />
        </TabsContent>
        <TabsContent value="dynamic_contact">
          <DynamicContactForm isContent={content} setIsContent={setContent} />
        </TabsContent>
      </Tabs>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will lose your data if you continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setTab(tabValue);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DynamicQRForm;
