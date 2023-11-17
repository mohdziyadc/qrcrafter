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
import { DynamicFreeText } from "@prisma/client";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import { useToast } from "./ui/use-toast";
import UpdateFreeTextForm from "./UpdateFreeTextForm";

type Props = {};

const FreeTextTable = (props: Props) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [qrCodes, setQRCodes] = useState<DynamicFreeText[]>([]);
  const [qrCode, setQrCode] = useState<DynamicFreeText>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["dynamicFreeTextQr"],
    queryFn: async () => {
      const response = await axios.get("/api/dynamicqr/freetext");
      return response.data.qrCodes;
    },
  });

  const {
    mutate: deleteFreeTextQR,
    isSuccess: isDeleted,
    isLoading: isDeleting,
  } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const response = await axios.post("/api/dynamicqr/freetext/delete", {
        uniqueToken: uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dynamicFreeTextQr"],
      });
      toast({
        title: "Success",
        description: "QR Code has been deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during this process.",
        variant: "destructive",
      });
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
            <TableHead>Text</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qrCodes?.map((qrCode, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{qrCode.name}</TableCell>
              <TableCell>
                {qrCode.freetext.length > 80 ? (
                  <p>{qrCode.freetext.slice(0, 80)}...</p>
                ) : (
                  <p>{qrCode.freetext}</p>
                )}
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
            <UpdateFreeTextForm
              qrCode={qrCode}
              editDialog={editDialog}
              setEditDialog={setEditDialog}
            />
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
                deleteFreeTextQR(qrCode!.uniqueToken);
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
  );
};

export default FreeTextTable;
