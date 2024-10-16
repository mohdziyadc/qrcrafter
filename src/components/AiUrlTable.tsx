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
import { AiURLQRCode, AnonymousURLQr } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { DialogContent, Dialog, DialogHeader, DialogTitle } from "./ui/dialog";
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
import UpdateAiUrlForm from "./UpdateAiUrlForm";
import { useToast } from "./ui/use-toast";
import NoQrFound from "./NoQrFound";
import { getAnonAiUrlList } from "@/lib/actions";

type Props = {};

const AiUrlTable = (props: Props) => {
  const [qrCodes, setQrCodes] = useState<AiURLQRCode[]>([]);
  const [anonQrCodes, setAnonQrCodes] = useState<AnonymousURLQr[]>([]);

  const [qrCode, setQrCode] = useState<AiURLQRCode>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["aiUrlQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/url");
      return response.data.qrCodes;
    },
  });

  useEffect(() => {
    const getAnonQrcodes = async () => {
      const res = await getAnonAiUrlList();
      // setAnonQrCodes(res.qrCodes)
      console.log("Anon QR Code Message: " + JSON.stringify(res.message));

      console.log("Anon QR Codes: " + res.qrCodes);
    };
    getAnonQrcodes();
  });

  const { mutate: deleteAiUrlQr, isLoading: isDeleting } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const response = await axios.post("/api/aiqrcode/url/delete", {
        uniqueToken: uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have deleted the QR code successfully.",
      });
      setDeleteDialog(false);
      queryClient.invalidateQueries(["aiUrlQrCodes"]);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occurred during the process.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setQrCodes(data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <LoadingSpinner component />;
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center">
        An unknown error occured. Please try again
      </div>
    );
  }
  return (
    <div>
      {qrCodes.length !== 0 ? (
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
                <TableRow key={qrCode.id}>
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
                <UpdateAiUrlForm
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
                  This will permanently delete this QR code. This cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500"
                  onClick={() => {
                    deleteAiUrlQr(qrCode!.uniqueToken);
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
          <NoQrFound qrType="URL" />
        </div>
      )}
    </div>
  );
};

export default AiUrlTable;
