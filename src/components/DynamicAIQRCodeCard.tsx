"use client";
import { useImage } from "@/app/context/useImage";
import { useLoading } from "@/app/context/useLoading";
import LoadingSpinner from "@/app/manage/loading";
import React from "react";

type Props = {};

const DynamicAIQRCodeCard = (props: Props) => {
  const { loading, setLoading } = useLoading();
  //   const { image } = useImage();

  return (
    <div className="flex flex-1">
      {loading ? <LoadingSpinner component /> : <p>Not Loading</p>}
    </div>
  );
};

export default DynamicAIQRCodeCard;
