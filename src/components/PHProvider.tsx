"use client";
import React from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const PHProvider = ({ children }: Props) => {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PHProvider;
