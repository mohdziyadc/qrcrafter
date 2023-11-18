"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Edit2, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { AiContactQr } from "@prisma/client";
import NoQrFound from "./NoQrFound";

type Props = {};

const AiContactTable = (props: Props) => {
  const [qrCodes, setQrCodes] = useState<AiContactQr[]>([]);
  const [qrCode, setQrCode] = useState<AiContactQr>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  return (
    <div>
      <div>
        {qrCodes.length !== 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qrCodes.map((qrCode, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {qrCode.first_name} {qrCode.last_name}
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
                {/* {qrCode && (
                  <UpdateContactForm
                    qrCode={qrCode}
                    editDialog={editDialog}
                    setEditDialog={setEditDialog}
                  />
                )} */}
              </DialogContent>
            </Dialog>
            <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this QR code. This cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500"
                    onClick={() => {
                      // deleteQR(qrCode!.uniqueToken);
                      // if (isDeleted) {
                      //   setDeleteDialog(false);
                      // }
                    }}
                  >
                    {/* {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <p>Delete</p>
                    )} */}
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <NoQrFound qrType="Contact" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AiContactTable;
