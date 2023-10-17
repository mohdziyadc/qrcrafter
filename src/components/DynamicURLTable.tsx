"use client";
import React from "react";
import { DynamicURL } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Delete, DeleteIcon, Edit2, Trash2 } from "lucide-react";

type Props = {
  qrCodes: DynamicURL[];
};

const SavedQRCode = ({ qrCodes }: Props) => {
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
        <TableBody>
          {qrCodes.map((qrCode, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{qrCode.name}</TableCell>
              <TableCell>{qrCode.url}</TableCell>
              <TableCell>
                <div className="flex flex-row justify-start items-center">
                  <div className="hover:bg-secondary-foreground/10 rounded-md w-fit p-2 ">
                    <Edit2 className="h-4 w-4 " />
                  </div>
                  <div className="ml-1 text-red-500 hover:bg-secondary-foreground/10 w-fit p-2 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SavedQRCode;
