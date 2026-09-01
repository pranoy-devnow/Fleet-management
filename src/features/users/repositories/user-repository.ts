import { ACCESS_REQUESTS } from "../data/access-requests";
import { HOSPITAL_USERS } from "../data/hospital-users";
import { MEDELA_USERS } from "../data/medela-users";
import type { AccessRequest, HospitalUser, MedelaUser } from "../types";

/**
 * Medela staff, sorted by name. Returns copies so callers can hold the result
 * in state and replace entries without touching the fixtures.
 */
export function listMedelaUsers(): MedelaUser[] {
  return MEDELA_USERS.map((user) => ({ ...user })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

/**
 * Hospital staff, sorted by name. Read-only in this system.
 */
export function listHospitalUsers(): HospitalUser[] {
  return HOSPITAL_USERS.map((user) => ({ ...user })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

/**
 * Access requests awaiting an admin decision, oldest first.
 */
export function listAccessRequests(): AccessRequest[] {
  return ACCESS_REQUESTS.map((request) => ({ ...request })).sort((a, b) =>
    a.requestedOn.localeCompare(b.requestedOn),
  );
}
