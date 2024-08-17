// app/providers.js
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import Cookies from "js-cookie";

if (typeof window !== "undefined") {
  // TODO: Edit to to use T3 env vars
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const sessionId = Cookies.get("sessionId");

  useEffect(() => {
    if (sessionId) {
      posthog.identify(sessionId, { sessionId });
    } else {
      posthog.reset();
    }
  }, [sessionId]);

  return children;
}
