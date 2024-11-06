"use client";
import { ImageContextProvider } from "@/app/context/useImage";
import { LoadingContextProvider } from "@/app/context/useLoading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import PHProvider from "./PHProvider";
import PostHogPageView from "./PostHogPageView";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <PHProvider>
        <PostHogPageView />
        <SessionProvider>
          <LoadingContextProvider>
            <ImageContextProvider>{children}</ImageContextProvider>
          </LoadingContextProvider>
        </SessionProvider>
      </PHProvider>
    </QueryClientProvider>
  );
};

export default Providers;
