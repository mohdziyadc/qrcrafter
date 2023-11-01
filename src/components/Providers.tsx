"use client";
import { ImageContextProvider } from "@/app/context/useImage";
import { LoadingContextProvider } from "@/app/context/useLoading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingContextProvider>
        <ImageContextProvider>{children}</ImageContextProvider>
      </LoadingContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
