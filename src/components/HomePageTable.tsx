import React, { forwardRef, useEffect } from "react";
import AiUrlTable from "./AiUrlTable";
import AiMultiUrlTable from "./AiMultiUrlTable";
import AiFreeTextTable from "./AiFreeTextTable";
import AiContactTable from "./AiContactTable";

type Props = {
  qrType: string;
};

const HomePageTable = forwardRef<HTMLDivElement, Props>(
  ({ qrType }: Props, ref) => {
    useEffect(() => {
      console.log(ref);
    });
    return (
      <div ref={ref} className="overflow-x-auto">
        {qrType === "url" && <AiUrlTable isHomepage={true} />}
        {qrType === "multi_url" && <AiMultiUrlTable isHomepage={true} />}
        {qrType === "contact" && <AiContactTable isHomepage={true} />}
        {qrType === "free_text" && <AiFreeTextTable isHomepage={true} />}
      </div>
    );
  }
);

HomePageTable.displayName = "HomePageTable";

export default HomePageTable;
