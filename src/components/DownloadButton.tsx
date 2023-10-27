"use client";
import { DynamicContact } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { saveAs } from "file-saver";

type Props = {
  contact: DynamicContact;
};

const DownloadButton = ({ contact }: Props) => {
  const handleDownload = async () => {
    try {
      const response = await axios.post("/api/vCard", {
        first_name: contact.firstName,
        last_name: contact.lastName,
        organisation: contact.organisation,
        email: contact.email,
        phone_number: contact.phoneNumber,
      });
      if (response.data) {
        const blob = new Blob([response.data], {
          type: "text/vcard",
        });
        saveAs(blob, "contact.vcf");
      } else {
        console.error("Failed to download vCard");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return <Button onClick={handleDownload}>Download</Button>;
};

export default DownloadButton;
