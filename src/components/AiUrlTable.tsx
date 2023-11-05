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
import { AiURLQRCode } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/app/manage/loading";
import { Edit2, Trash2 } from "lucide-react";

type Props = {};

const AiUrlTable = (props: Props) => {
  const [qrCodes, setQrCodes] = useState<AiURLQRCode[]>([]);
  const [qrCode, setQrCode] = useState<AiURLQRCode>();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["aiUrlQrCodes"],
    queryFn: async () => {
      const response = await axios.get("/api/aiqrcode/url");
      return response.data.qrCodes;
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
    </>
  );
};

export default AiUrlTable;
