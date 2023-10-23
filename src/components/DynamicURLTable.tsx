"use client";
import React, { useEffect, useState } from "react";
import { DynamicURL } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import UpdateURLForm from "./UpdateURLForm";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import useSWR, { useSWRConfig } from "swr";
import LoadingSpinner from "@/app/manage/loading";

type Props = {};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const DynamicURLTable = ({}: Props) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const {
    data,
    error,
    isLoading: isFetching,
  } = useSWR("/api/dynamicqr/url/getall", fetcher);
  const { mutate } = useSWRConfig();
  const [qrCodes, setQRCodes] = useState<DynamicURL[]>([]);
  const [qrCode, setQrCode] = useState<DynamicURL>();
  const { toast } = useToast();

  useEffect(() => {
    const setData = async () => {
      if (data !== undefined) {
        const qrCodes = await data.qrCodes; //dont forget to add the await keyword
        setQRCodes(qrCodes);
      }
    };
    setData();
  }, [data]);

  // need to call the delete post request when delete button is clicked in alert dialog
  const {
    mutate: deleteQR,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const response = await axios.post("/api/dynamicqr/url/delete", {
        uniqueToken: uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "QR Code has been deleted successfully!",
      });
      mutate("/api/dynamicqr/url/getall"); //update without refreshing
    },
    onError: () => {
      toast({
        title: "Unknow Error",
        description: "An unknown error occured during the process",
      });
    },
  });

  if (isFetching) {
    return <LoadingSpinner component={true} />;
  }
  if (error) {
    return <div>Failed to Load. Please Refresh</div>;
  }
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
          {qrCodes?.map((qrCode, idx) => (
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
            <UpdateURLForm
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
                deleteQR(qrCode!.uniqueToken);
                if (isSuccess) {
                  setDeleteDialog(false);
                }
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

export default DynamicURLTable;
