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
import { AiFreeTextQr, AnonymousFreetextQr } from "@prisma/client";
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
import NoQrFound from "./NoQrFound";
import { deleteAnonAiFreetextQr, getAnonAiFreetextList } from "@/lib/actions";

type Props = {
  isHomepage: boolean;
};

const AiFreeTextTable = ({ isHomepage }: Props) => {
  const [qrCodes, setQrCodes] = useState<AiFreeTextQr[]>([]);
  const [anonQrCodes, setAnonQrCodes] = useState<AnonymousFreetextQr[]>([]);
  const [qrCode, setQrCode] = useState<AiFreeTextQr | AnonymousFreetextQr>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const {
    data: aiQrCodesList,
    isLoading: fetchingQr,
    isError: isAiError,
    isSuccess: fetchSuccess,
  } = useQuery({
    queryKey: ["aiFreeTextQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/freetext");
      return response.data.qrCodes;
    },
    enabled: !isHomepage,
  });

  const {
    data: anonQrCodesList,
    isLoading: isAnonLoading,
    isError: isAnonError,
    isSuccess: isAnonSuccess,
  } = useQuery({
    queryKey: ["AnonAiFreetextQrCodes"],
    queryFn: async () => {
      const res = await getAnonAiFreetextList();
      return res;
    },
    enabled: isHomepage,
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

  const { mutate: deleteAnonQr, isLoading: isAnonDeleting } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const res = await deleteAnonAiFreetextQr(uniqueToken);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: "You have successfully deleted the QR code.",
        });
        queryClient.invalidateQueries(["AnonAiFreetextQrCodes"]);
        setDeleteDialog(false);
      }
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
      setQrCodes(aiQrCodesList);
    }
  }, [aiQrCodesList, fetchSuccess]);

  useEffect(() => {
    if (isAnonSuccess) {
      setAnonQrCodes(anonQrCodesList.qrCodes);
    }
  }, [isAnonSuccess, anonQrCodesList]);

  const isLoading = fetchingQr && isAnonLoading;
  const isError = isAnonError || isAiError;

  const onDeleteHandler = () => {
    if (!qrCode) {
      return;
    }
    if (isHomepage) {
      deleteAnonQr(qrCode.uniqueToken);
      return;
    }
    deleteAiFreeTextQr(qrCode.uniqueToken);
  };

  if (isLoading) {
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
      {(isHomepage ? anonQrCodes : qrCodes).length === 0 ? (
        <div className="flex justify-center items-center ">
          <NoQrFound isHomepage={isHomepage} qrType="Free Text" />
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
            {(isHomepage ? anonQrCodes : qrCodes).map((qrCode, idx) => {
              const freeText = isHomepage
                ? (qrCode as AnonymousFreetextQr).free_text
                : (qrCode as AiFreeTextQr).freetext;
              const displayText =
                freeText.length > 80 ? `${freeText.slice(0, 80)}...` : freeText;
              return (
                <TableRow key={qrCode.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{qrCode.name}</TableCell>
                  <TableCell>{displayText}</TableCell>
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
              );
            })}
          </TableBody>
        </Table>
      )}

      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-[23rem] sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit QR Code</DialogTitle>
          </DialogHeader>
          {qrCode && (
            <UpdateAiFreeTextForm
              qrCode={qrCode}
              editDialog={editDialog}
              setEditDialog={setEditDialog}
              isAnonymous={isHomepage}
            />
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent className="max-w-[23rem] sm:max-w-md md:max-w-lg">
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
                onDeleteHandler();
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
