"use client";
import React, { useEffect, useState } from "react";
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
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import UpdateURLForm from "./UpdateURLForm";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  qrCodes: DynamicURL[];
};

const DynamicURLTable = ({ qrCodes }: Props) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [qrCode, setQrCode] = useState<DynamicURL>();

  return (
    <ScrollArea className="h-fit">
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
                  <div
                    className="hover:bg-secondary-foreground/10 rounded-md w-fit p-2"
                    onClick={() => {
                      setEditDialog(true);
                      setQrCode(qrCode);
                    }}
                  >
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

      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit QR Code</DialogTitle>
          </DialogHeader>
          {qrCode && (
            <UpdateURLForm
              qrCode={qrCode}
              editDialog={editDialog}
              setEditDialog={setEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </ScrollArea>
  );
};

export default DynamicURLTable;
