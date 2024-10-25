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
import { AiContactQr, AnonymousContactQr } from "@prisma/client";
import NoQrFound from "./NoQrFound";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import UpdateAiContactForm from "./UpdateAiContactForm";
import { useToast } from "./ui/use-toast";
import { deleteAnonAiContactQr, getAnonAiContactList } from "@/lib/actions";

type Props = {
  isHomepage: boolean;
};

const AiContactTable = ({ isHomepage }: Props) => {
  const [qrCodes, setQrCodes] = useState<AiContactQr[]>([]);
  const [anonQrCodes, setAnonQrCodes] = useState<AnonymousContactQr[]>([]);
  const [qrCode, setQrCode] = useState<AiContactQr | AnonymousContactQr>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: aiQrCodes,
    isLoading: isAiLoading,
    isError: isAiError,
    isSuccess: isAiSuccess,
  } = useQuery({
    queryKey: ["aiContactQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/contact");
      return response.data.qrCodes;
    },
    enabled: !isHomepage,
  });

  const {
    data: anonQrCodeList,
    isLoading: isAnonLoading,
    isError: isAnonError,
    isSuccess: isAnonSuccess,
  } = useQuery({
    queryKey: ["AnonAiContactQrCodes"],
    queryFn: async () => {
      const res = await getAnonAiContactList();
      return res;
    },
    enabled: isHomepage,
  });

  const { mutate: deleteAiContactQr, isLoading: isDeleting } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const response = await axios.post("/api/aiqrcode/contact/delete", {
        uniqueToken: uniqueToken,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["aiContactQrCodes"]);
      toast({
        title: "Success!",
        description: "You have successfully deleted the QR code",
      });
      setDeleteDialog(false);
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An error occurred during the process.",
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteAnonContactQr, isLoading: isAnonDeleting } =
    useMutation({
      mutationFn: async (uniqueToken: string) => {
        const res = await deleteAnonAiContactQr(uniqueToken);
        return res;
      },
      onSuccess: (data) => {
        if (data.success) {
          queryClient.invalidateQueries(["AnonAiContactQrCodes"]);
          toast({
            title: "Success!",
            description: "You have successfully deleted the QR code",
          });
          setDeleteDialog(false);
        }
      },
      onError: () => {
        toast({
          title: "Error!",
          description: "An error occurred during the process.",
          variant: "destructive",
        });
      },
    });

  useEffect(() => {
    if (isAiSuccess) {
      setQrCodes(aiQrCodes);
    }
  }, [isAiSuccess, aiQrCodes]);

  useEffect(() => {
    if (isAnonSuccess) {
      setAnonQrCodes(anonQrCodeList.qrCodes);
    }
  }, [isAnonSuccess, anonQrCodeList]);

  const isLoading = isAiLoading && isAnonLoading;
  const isSuccess = isAiSuccess || isAnonSuccess;
  const isError = isAiError && isAnonError;

  const onDeleteHandler = () => {
    const isAnonymous = isHomepage;
    if (!qrCode) {
      return;
    }
    if (isAnonymous) {
      deleteAnonContactQr(qrCode.uniqueToken);
      return;
    }
    deleteAiContactQr(qrCode.uniqueToken);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner component />
      </div>
    );
  }
  if (isError) {
    return <div>An unknown error occured. Please Try again</div>;
  }

  return (
    <div>
      <div>
        {(isHomepage ? anonQrCodes : qrCodes).length !== 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isHomepage ? anonQrCodes : qrCodes).map((qrCode, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {isHomepage && (qrCode as AnonymousContactQr).name}
                    </TableCell>
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
              <DialogContent className="max-w-[23rem] sm:max-w-md md:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Edit QR Code</DialogTitle>
                </DialogHeader>
                {qrCode && (
                  <UpdateAiContactForm
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
                    This will permanently delete this QR code. This cannot be
                    undone.
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
            <NoQrFound qrType="Contact" isHomepage={isHomepage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AiContactTable;
