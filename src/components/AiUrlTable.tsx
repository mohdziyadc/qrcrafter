"use client";
import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

type Props = {};

const AiUrlTable = (props: Props) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </>
  );
};

export default AiUrlTable;
