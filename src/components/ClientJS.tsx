import { getFingerprintClient } from "@/lib/fingerprint";
import { createHash } from "crypto";
import React, { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  setFingerprint: Dispatch<SetStateAction<string | undefined>>;
};

const ClientJS = ({ setFingerprint }: Props) => {
  useEffect(() => {
    const fpClient = getFingerprintClient();
    if (fpClient) {
      //   setFingerprint(fpent.getFingerprint().toString());
      const data = {
        // userAgent: fpClient.getUserAgent(),
        os: fpClient.getOS(),
        deviceVendor: fpClient.getDeviceVendor(),
        deviceType: fpClient.getDeviceType(),
        cpu: fpClient.getCPU(),
        timeZone: fpClient.getTimeZone(),
        language: fpClient.getLanguage(),
        sysLanguage: fpClient.getSystemLanguage(),
      };

      Object.keys(data).forEach((key) => {
        const dataKey = key as keyof typeof data;
        const value = data[dataKey];

        if (typeof value === "string") {
          data[dataKey] = value.toLowerCase(); // Modify the original object
        }
      });
      console.log(JSON.stringify(data));
      const fingerprintHash = createHash("sha256")
        .update(JSON.stringify(data))
        .digest("hex");
      setFingerprint(fingerprintHash);
    }
  });
  return null;
};

export default ClientJS;
