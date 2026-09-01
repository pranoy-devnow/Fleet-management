import type { AccessRequest, MedelaUser } from "../types";

/**
 * Removes one request from the queue and, when accepted, returns that person
 * so the directory can admit them.
 *
 * @param requests - Current pending queue
 * @param requestId - Request to decide
 * @param decision - Accept admits them; reject only drops the request
 * @returns A new queue, plus the accepted request or null. An unknown id
 *   leaves the queue unchanged rather than throwing — the list and the
 *   buttons can only disagree if a row was already decided.
 */
export function decideAccessRequest(
  requests: readonly AccessRequest[],
  requestId: string,
  decision: "accepted" | "rejected",
): { requests: AccessRequest[]; accepted: AccessRequest | null } {
  const request = requests.find((candidate) => candidate.id === requestId);
  if (request === undefined) {
    return { requests: [...requests], accepted: null };
  }

  return {
    requests: requests.filter((candidate) => candidate.id !== requestId),
    accepted: decision === "accepted" ? request : null,
  };
}

/**
 * Turns an accepted request into a Medela staff row.
 *
 * @param request - Person who was just accepted
 */
export function medelaUserFromRequest(request: AccessRequest): MedelaUser {
  return {
    id: request.id,
    name: request.name,
    email: request.email,
    department: request.department,
    role: request.requestedRole,
    initials: request.initials,
  };
}

/**
 * Inserts an accepted person into the Medela directory, sorted by name.
 *
 * @param users - Current staff list
 * @param request - Person to admit
 */
export function admitAcceptedUser(
  users: readonly MedelaUser[],
  request: AccessRequest,
): MedelaUser[] {
  return [...users, medelaUserFromRequest(request)].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}
