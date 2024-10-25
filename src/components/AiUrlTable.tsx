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
import { deleteAnonAiUrlQrcode, getAnonAiUrlList } from "@/lib/actions";

type Props = {
  isHomepage: boolean;
};

const AiUrlTable = ({ isHomepage }: Props) => {
  const [qrCodes, setQrCodes] = useState<AiURLQRCode[]>([]);
  const [anonQrCodes, setAnonQrCodes] = useState<AnonymousURLQr[]>([]);

  const [qrCode, setQrCode] = useState<AiURLQRCode | AnonymousURLQr>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: aiQrcodesData,
    isLoading: aiQrcodeLoading,
    isSuccess: aiQrcodeSuccess,
    isError: aiQrcodeError,
  } = useQuery({
    queryKey: ["aiUrlQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/url");
      return response.data.qrCodes;
    },
    enabled: !isHomepage,
  });

  const {
    data: anonQrcodesData,
    isSuccess: anonQrcodeSuccess,
    isLoading: anonQrcodeLoading,
    isError: anonQrcodeError,
  } = useQuery({
    queryKey: ["AnonAiUrlQrCodes"],
    queryFn: async () => await getAnonAiUrlList(),
    enabled: isHomepage,
  });

  const isLoading = anonQrcodeLoading && aiQrcodeLoading;
  const isSuccess = anonQrcodeSuccess || aiQrcodeSuccess;

  useEffect(() => {
    if (anonQrcodeSuccess) {
      setAnonQrCodes(anonQrcodesData.qrCodes);
    }
    console.log("ANON QR CODES: " + anonQrCodes);
    console.log("IS ERROR: " + aiQrcodeError);
  }, [anonQrcodesData, anonQrcodeSuccess]);

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

  const { mutate: deleteAnonQrcode, isLoading: isAnonDeleting } = useMutation({
    mutationFn: async () => await deleteAnonAiUrlQrcode(qrCode!.uniqueToken),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have deleted the QR code successfully.",
      });
      setDeleteDialog(false);
      queryClient.invalidateQueries(["AnonAiUrlQrCodes"]);
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
      setQrCodes(aiQrcodesData);
    }
  }, [aiQrcodesData, isSuccess]);

  if (isLoading) {
    return <LoadingSpinner component />;
  }
  if (anonQrcodeError && aiQrcodeError) {
    return (
      <div className="flex justify-center items-center">
        An unknown error occured. Please try again
      </div>
    );
  }
  return (
    <div>
      {(isHomepage ? anonQrCodes : qrCodes).length !== 0 ? (
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
              {(isHomepage ? anonQrCodes : qrCodes).map((qrCode, idx) => (
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
            <DialogContent className="max-w-[23rem] sm:max-w-md md:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit QR Code</DialogTitle>
              </DialogHeader>
              {qrCode && (
                <UpdateAiUrlForm
                  qrCode={qrCode}
                  editDialog={editDialog}
                  setEditDialog={setEditDialog}
                  isAnonymous={isHomepage ? true : false}
                />
              )}
            </DialogContent>
          </Dialog>
          <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
            <AlertDialogContent className="max-w-[23rem] sm:max-w-md md:max-w-lg">
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
                    if (isHomepage) {
                      deleteAnonQrcode();
                      return;
                    }
                    deleteAiUrlQr(qrCode!.uniqueToken);
                  }}
                >
                  {isDeleting || isAnonDeleting ? (
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
          <NoQrFound qrType="URL" isHomepage={isHomepage} />
        </div>
      )}
    </div>
  );
};

export default AiUrlTable;
