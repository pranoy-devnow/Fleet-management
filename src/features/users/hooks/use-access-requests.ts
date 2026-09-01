"use client";

import { useCallback, useSyncExternalStore } from "react";

import { accessRequestStore } from "../lib/access-request-store";
import type { AccessRequest } from "../types";

/**
 * Live pending-request queue shared by the header badge and user management.
 */
export function useAccessRequests(): {
  requests: AccessRequest[];
  decide: (requestId: string, decision: "accepted" | "rejected") => AccessRequest | null;
} {
  const requests = useSyncExternalStore(
    accessRequestStore.subscribe,
    accessRequestStore.getSnapshot,
    accessRequestStore.getSnapshot,
  );
  const decide = useCallback(
    (requestId: string, decision: "accepted" | "rejected") =>
      accessRequestStore.decide(requestId, decision),
    [],
  );

  return { requests, decide };
}
