// import { Card, CardContent } from "@/components/ui/card";
// import { prismaClient } from "@/lib/db";
// import React from "react";

// type Props = {
//   params: {
//     slug: string[];
//   };
// };

// const FreeTextQR = async (props: Props) => {
//   const [uniqueToken] = props.params.slug;
//   const freeTextQR = await prismaClient.dynamicFreeText.findUnique({
//     where: {
//       uniqueToken: uniqueToken,
//     },
//   });
//   return freeTextQR ? (
//     <div>
//       <Card>
//         <CardContent>{freeTextQR.freetext}</CardContent>
//       </Card>
//     </div>
//   ) : (
//     <div>No Text Found</div>
//   );
// };

// export default FreeTextQR;
