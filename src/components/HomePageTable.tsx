import React from "react";
import AiUrlTable from "./AiUrlTable";
import AiMultiUrlTable from "./AiMultiUrlTable";
import AiFreeTextTable from "./AiFreeTextTable";
import AiContactTable from "./AiContactTable";

type Props = {
  qrType: string;
};

function HomePageTable({ qrType }: Props) {
  return (
    <>
      {qrType === "url" && <AiUrlTable isHomepage={true} />}
      {qrType === "multi_url" && <AiMultiUrlTable isHomepage={true} />}
      {qrType === "contact" && <AiContactTable isHomepage={true} />}
      {qrType === "free_text" && <AiFreeTextTable />}
    </>
  );
}

export default HomePageTable;
