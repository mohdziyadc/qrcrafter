"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
} from "./ui/alert-dialog";
import { DynamicMultiURL } from "@prisma/client";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import { title } from "process";

type Props = {};

const MultiURLTable = (props: Props) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [qrCodes, setQRCodes] = useState<DynamicMultiURL[]>([]);
  const [qrCode, setQrCode] = useState<DynamicMultiURL>();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["dynamicMultiUrlQr"],
    queryFn: async () => {
      const response = await axios.get("/api/dynamicqr/multiurl");
      return response.data.qrCodes;
    },
  });

  // Avoids too many rerenders error if we use useEffect
  useEffect(() => {
    if (isSuccess) {
      setQRCodes(data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <LoadingSpinner component />;
  }

  if (isError) {
    return <div>Unknown Error Occured. Please refresh the page</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Titles</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qrCodes?.map((qrCode, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{qrCode.name}</TableCell>
              <TableCell>
                {qrCode.titles.map((title, idx, titles) => {
                  if (idx !== titles.length - 1) {
                    return `${title}, `;
                  } else {
                    return `${title}`;
                  }
                })}
              </TableCell>
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
                  <div
                    className="ml-1 text-red-500 hover:bg-secondary-foreground/10 w-fit p-2 rounded-md"
                    onClick={() => {
                      setQrCode(qrCode);
                      setDeleteDialog(true);
                    }}
                  >
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
            <p>Hello</p>
            // <UpdateURLForm
            //   qrCode={qrCode}
            //   editDialog={editDialog}
            //   setEditDialog={setEditDialog}
            // />
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this QR code. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500"
              onClick={() => {
                // deleteQR(qrCode!.uniqueToken);
                // if (isSuccess) {
                //   setDeleteDialog(false);
                // }
              }}
            >
              {isLoading ? <Loader2 className="h-4 w-4" /> : <p>Delete</p>}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MultiURLTable;
