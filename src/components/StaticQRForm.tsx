"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import URLForm from "./URLForm";
import MultiURLForm from "./MultiURLForm";
import FreeTextForm from "./FreeTextForm";
import ContactForm from "./ContactForm";

type Props = {};

const StaticQRForm = (props: Props) => {
  return (
    <Tabs defaultValue="url" className="max-h-screen">
      <TabsList className="grid grid-cols-4 gap-2 w-full">
        <TabsTrigger value="url">URL</TabsTrigger>
        <TabsTrigger value="multi_url">Multi-URL</TabsTrigger>
        <TabsTrigger value="freetext">Free Text</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="url" tabIndex={-1}>
        <URLForm />
      </TabsContent>
      <TabsContent value="multi_url">
        <MultiURLForm />
      </TabsContent>
      <TabsContent value="freetext">
        <FreeTextForm />
      </TabsContent>
      <TabsContent value="contact">
        <ContactForm />
      </TabsContent>
    </Tabs>
  );
};

export default StaticQRForm;
