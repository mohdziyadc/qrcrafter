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
import { AnonymousMultiUrlQr, MulitUrlAiQr } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import UpdateAiMultiUrlForm from "./UpdateAiMultiUrlForm";
import { useToast } from "./ui/use-toast";
import NoQrFound from "./NoQrFound";
import { deleteAnonAiMultiUrlQr, getAnonAiMultiUrlList } from "@/lib/actions";

type Props = {
  isHomepage: boolean;
};

const AiMultiUrlTable = ({ isHomepage }: Props) => {
  const [qrCodes, setQrCodes] = useState<MulitUrlAiQr[]>([]);
  const [anonQrCodes, setAnonQrCodes] = useState<AnonymousMultiUrlQr[]>([]);
  const [qrCode, setQrCode] = useState<MulitUrlAiQr | AnonymousMultiUrlQr>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const {
    data: aiMultiQrCodes,
    isLoading: aiQrLoading,
    isSuccess: aiQrSuccess,
  } = useQuery({
    queryKey: ["aiMultiUrlQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/multiurl");
      return response.data.qrCodes;
    },
    enabled: !isHomepage,
  });

  const {
    data: anonQrCodeList,
    isLoading: anonQrLoading,
    isSuccess: anonQrSuccess,
  } = useQuery({
    queryKey: ["AnonAiMultiUrlQrCodes"],
    queryFn: async () => await getAnonAiMultiUrlList(),
    enabled: isHomepage,
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

  const { mutate: deleteAnonQrCode, isLoading: isAnonDeleting } = useMutation({
    mutationFn: async (uniqueToken: string) => {
      const res = await deleteAnonAiMultiUrlQr(uniqueToken);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: "You have deleted the QR code successfully.",
        });
        setDeleteDialog(false);
        queryClient.invalidateQueries(["AnonAiMultiUrlQrCodes"]);
      }
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "An unknown error occured during the process.",
        variant: "destructive",
      });
    },
  });

  const onDeleteHandler = () => {
    const isAnonymous = isHomepage;
    if (!qrCode) {
      return;
    }
    if (isAnonymous) {
      deleteAnonQrCode(qrCode.uniqueToken);
      return;
    }
    deleteAiMultiUrlQr(qrCode.uniqueToken);
  };
  useEffect(() => {
    if (aiQrSuccess) {
      setQrCodes(aiMultiQrCodes);
    }
  }, [aiQrSuccess, aiMultiQrCodes]);

  useEffect(() => {
    if (anonQrSuccess) {
      setAnonQrCodes(anonQrCodeList.qrCodes);
    }
  }, [anonQrSuccess, anonQrCodeList]);

  const isLoading = aiQrLoading && anonQrLoading;

  if (isLoading) {
    return <LoadingSpinner component />;
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
                <TableHead>Titles</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isHomepage ? anonQrCodes : qrCodes).map((qrCode, idx) => (
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
            <DialogContent className="max-w-[23rem] sm:max-w-md md:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit QR Code</DialogTitle>
              </DialogHeader>
              {qrCode && (
                <UpdateAiMultiUrlForm
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
          <NoQrFound qrType="Multi URL" isHomepage={isHomepage} />
        </div>
      )}
    </div>
  );
};

export default AiMultiUrlTable;
