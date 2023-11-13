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
import { MulitUrlAiQr } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import UpdateAiMultiUrlForm from "./UpdateAiMultiUrlForm";
import { useToast } from "./ui/use-toast";

type Props = {};

const AiMultiUrlTable = (props: Props) => {
  const [qrCodes, setQrCodes] = useState<MulitUrlAiQr[]>([]);
  const [qrCode, setQrCode] = useState<MulitUrlAiQr>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["aiMultiUrlQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/multiurl");
      return response.data.qrCodes;
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteAiMultiUrlQr, isLoading: isDeleting } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const response = await axios.post("/api/aiqrcode/multiurl/delete", {
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
      queryClient.invalidateQueries(["aiMultiUrlQrCodes"]);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
        variant: "destructive",
      });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      setQrCodes(data);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <LoadingSpinner component />;
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
          {qrCodes.map((qrCode, idx) => (
            <TableRow key={qrCode.id}>
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
            <UpdateAiMultiUrlForm
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
                deleteAiMultiUrlQr(qrCode!.uniqueToken);
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

export default AiMultiUrlTable;
