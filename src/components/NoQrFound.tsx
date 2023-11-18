import React from "react";

type Props = {
  qrType: string;
};

const NoQrFound = ({ qrType }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="text-lg font-semibold">No {qrType} QR codes found</div>
      <div className="flex justify-center items-center underline underline-offset-2 text-base mt-2 text-primary/50">
        Click here to create one
      </div>
    </div>
  );
};

export default NoQrFound;
