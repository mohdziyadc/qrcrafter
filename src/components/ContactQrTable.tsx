"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
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
import { DynamicContact } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";

type Props = {};

const ContactQrTable = (props: Props) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [qrCodes, setQRCodes] = useState<DynamicContact[]>([]);
  const [qrCode, setQrCode] = useState<DynamicContact>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: contactQrCodes,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["dynamicContactQr"],
    queryFn: async () => {
      const response = await axios.get("/api/dynamicqr/contact");
      return response.data.qrCodes;
    },
  });

  const {
    mutate: deleteQR,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const response = await axios.post("/api/dynamicqr/contact/delete", {
        uniqueToken: uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dynamicContactQr"]);
      toast({
        title: "Success!",
        description: "You have deleted the QR code successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown occurred during the process.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setQRCodes(contactQrCodes);
    }
  }, [contactQrCodes, isSuccess]);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner component />
      </>
    );
  }
  console.log("QR CODES: ", qrCodes?.length);

  return (
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
                    {qrCode.firstName} {qrCode.lastName}
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
            <UpdateFreeTextForm
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
                    deleteQR(qrCode!.uniqueToken);
                    if (isDeleted) {
                      setDeleteDialog(false);
                    }
                  }}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <p>Delete</p>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Contact QR Codes found</p>
        </div>
      )}
    </div>
  );
};

export default ContactQrTable;
