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
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { AiFreeTextQr } from "@prisma/client";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import UpdateAiFreeTextForm from "./UpdateAiFreeTextForm";
import { useToast } from "./ui/use-toast";

type Props = {};

const AiFreeTextTable = (props: Props) => {
  const [qrCodes, setQrCodes] = useState<AiFreeTextQr[]>([]);
  const [qrCode, setQrCode] = useState<AiFreeTextQr>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const {
    data,
    isLoading: fetchingQr,
    isError,
    isSuccess: fetchSuccess,
  } = useQuery({
    queryKey: ["aiFreeTextQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/freetext");
      return response.data.qrCodes;
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteAiFreeTextQr, isLoading: isDeleting } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const response = await axios.post("/api/aiqrcode/freetext/delete", {
        uniqueToken: uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have successfully deleted the QR code.",
      });
      queryClient.invalidateQueries(["aiFreeTextQrCodes"]);
      setDeleteDialog(false);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during the process",
      });
    },
  });

  useEffect(() => {
    if (fetchSuccess) {
      setQrCodes(data);
    }
  }, [data, fetchSuccess]);

  if (fetchingQr) {
    return (
      <div>
        <LoadingSpinner component />
      </div>
    );
  }
  if (isError) {
    return (
      <div>An unknown error occured during the process. Please try again</div>
    );
  }
  return (
    <div>
      {qrCodes.length == 0 ? (
        <div className="flex justify-center items-center mt-2 ">
          <p>No free text QR Codes to show. Click here to create one.</p>
        </div>
      ) : (
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
            {qrCodes.map((qrCode, idx) => (
              <TableRow key={qrCode.id}>
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
      )}

      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit QR Code</DialogTitle>
          </DialogHeader>
          {qrCode && (
            <UpdateAiFreeTextForm
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
                deleteAiFreeTextQr(qrCode!.uniqueToken);
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
    </div>
  );
};

export default AiFreeTextTable;
