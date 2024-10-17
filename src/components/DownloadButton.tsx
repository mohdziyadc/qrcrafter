"use client";
import {
  AiContactQr,
  AnonymousContactQr,
  DynamicContact,
} from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { saveAs } from "file-saver";

type Props = {
  contact: DynamicContact | AiContactQr | AnonymousContactQr;
};

const DownloadButton = ({ contact }: Props) => {
  function isDynamicContact(
    contact: DynamicContact | AiContactQr | AnonymousContactQr
  ): contact is DynamicContact {
    return (contact as DynamicContact).firstName !== undefined;
  }

  function isAiContact(
    contact: DynamicContact | AiContactQr | AnonymousContactQr
  ): contact is AiContactQr {
    return (contact as AiContactQr).first_name !== undefined;
  }

  function isAnonAiContact(
    contact: DynamicContact | AiContactQr | AnonymousContactQr
  ): contact is AnonymousContactQr {
    return (contact as AnonymousContactQr).anonymousUserId !== undefined;
  }
  const handleDownload = async () => {
    let payload;
    if (isDynamicContact(contact)) {
      payload = {
        first_name: contact.firstName,
        last_name: contact.lastName,
        organisation: contact.organisation,
        email: contact.email,
        phone_number: contact.phoneNumber,
      };
    } else if (isAiContact(contact)) {
      payload = {
        first_name: contact.first_name,
        last_name: contact.last_name,
        organisation: contact.organisation,
        email: contact.email,
        phone_number: contact.phone_number,
      };
    } else if (isAnonAiContact(contact)) {
      payload = {
        first_name: contact.first_name,
        last_name: contact.last_name,
        organisation: contact.organisation,
        email: contact.email,
        phone_number: contact.phone_number,
      };
    }
    try {
      const response = await axios.post("/api/vCard", JSON.stringify(payload));
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
