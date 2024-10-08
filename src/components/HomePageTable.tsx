import React from "react";
import AiUrlTable from "./AiUrlTable";
import AiMultiUrlTable from "./AiMultiUrlTable";

type Props = {
  qrType: string;
};

function HomePageTable({ qrType }: Props) {
  return (
    <>
      {qrType === "url" && <AiUrlTable />}
      {qrType === "multi_url" && <AiMultiUrlTable />}
    </>
  );
}

export default HomePageTable;
