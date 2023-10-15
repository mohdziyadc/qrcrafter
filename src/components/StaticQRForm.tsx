"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import URLForm from "./URLForm";
import MultiURLForm from "./MultiURLForm";
import FreeTextForm from "./FreeTextForm";
import ContactForm from "./ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
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

type Props = {};

const StaticQRForm = (props: Props) => {
  const [tab, setTab] = useState("url");
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
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="multi_url">Multi-URL</TabsTrigger>
          <TabsTrigger value="freetext">Free Text</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="url" tabIndex={-1}>
          <URLForm content={content} setContent={setContent} />
        </TabsContent>
        <TabsContent value="multi_url">
          <MultiURLForm content={content} setContent={setContent} />
        </TabsContent>
        <TabsContent value="freetext">
          <FreeTextForm content={content} setContent={setContent} />
        </TabsContent>
        <TabsContent value="contact">
          <ContactForm content={content} setContent={setContent} />
        </TabsContent>
      </Tabs>
      {/* <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Static QR Code</DialogTitle>
            <DialogDescription>Create a static QR code here</DialogDescription>
          </DialogHeader>
          This is an alert dialog
        </DialogContent>
      </Dialog> */}
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

export default StaticQRForm;
