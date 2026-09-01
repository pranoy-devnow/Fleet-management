import { listAccessRequests } from "../repositories/user-repository";
import type { AccessRequest } from "../types";
import { decideAccessRequest } from "./decide-access-request";

/**
 * Shared pending-request queue so the header badge and `/internal/roles`
 * stay on the same number. There is no server: this lives in the module and
 * resets on a full reload.
 */
export function createAccessRequestStore(
  initial: readonly AccessRequest[] = listAccessRequests(),
) {
  let requests = [...initial];
  const listeners = new Set<() => void>();

  function emit() {
    for (const listener of listeners) listener();
  }

  return {
    /**
     * Current queue. Callers must not mutate the array.
     */
    getSnapshot(): AccessRequest[] {
      return requests;
    },

    /**
     * Subscribe to queue changes. Returns an unsubscribe function.
     */
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Accepts or rejects one request and notifies subscribers.
     *
     * @returns The accepted person, or null when the request was rejected or missing
     */
    decide(
      requestId: string,
      decision: "accepted" | "rejected",
    ): AccessRequest | null {
      const result = decideAccessRequest(requests, requestId, decision);
      if (result.requests.length === requests.length) return null;
      requests = result.requests;
      emit();
      return result.accepted;
    },
  };
}

export const accessRequestStore = createAccessRequestStore();
