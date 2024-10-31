"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

const PostHogPageView = (): null => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, posthog, searchParams]);
  return null;
};

export default PostHogPageView;
