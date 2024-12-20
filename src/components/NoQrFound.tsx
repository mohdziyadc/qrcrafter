import React from "react";

type Props = {
  qrType: string;
  isHomepage: boolean;
};

const NoQrFound = ({ qrType, isHomepage }: Props) => {
  return (
    <div className="flex flex-col text-center mt-20 justify-center items-center">
      <div className="text-3xl font-semibold">No {qrType} QR codes found</div>
      <div className="flex justify-center items-center   text-lg mt-2 text-blue-500">
        {isHomepage ? (
          <p>Create one from &quot;Create AI Qr Codes&quot; tab</p>
        ) : (
          <p>Click here to create one</p>
        )}
      </div>
    </div>
  );
};

export default NoQrFound;
