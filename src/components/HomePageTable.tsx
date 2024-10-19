import React from "react";
import AiUrlTable from "./AiUrlTable";
import AiMultiUrlTable from "./AiMultiUrlTable";

type Props = {
  qrType: string;
};

function HomePageTable({ qrType }: Props) {
  return (
    <>
      {qrType === "url" && <AiUrlTable isHomepage={true} />}
      {qrType === "multi_url" && <AiMultiUrlTable isHomepage={true} />}
    </>
  );
}

export default HomePageTable;
