import type { HospitalUser, MedelaUser } from "../types";

/**
 * Narrows Medela staff by a free-text query.
 *
 * Matches name, email, and department, so an admin can find someone by
 * whichever detail they remember.
 *
 * @param users - Staff to search
 * @param query - Free text; blank or whitespace returns everyone
 * @returns Matching users in their original order
 */
export function searchMedelaUsers(
  users: readonly MedelaUser[],
  query: string,
): MedelaUser[] {
  const term = normalize(query);
  if (term === "") return [...users];

  return users.filter(
    (user) =>
      includes(user.name, term) ||
      includes(user.email, term) ||
      includes(user.department, term),
  );
}

/**
 * Narrows hospital staff by a free-text query.
 *
 * Matches name, email, hospital, city, and country.
 *
 * @param users - Staff to search
 * @param query - Free text; blank or whitespace returns everyone
 * @returns Matching users in their original order
 */
export function searchHospitalUsers(
  users: readonly HospitalUser[],
  query: string,
): HospitalUser[] {
  const term = normalize(query);
  if (term === "") return [...users];

  return users.filter(
    (user) =>
      includes(user.name, term) ||
      includes(user.email, term) ||
      includes(user.hospital, term) ||
      includes(user.city, term) ||
      includes(user.country, term),
  );
}

function normalize(query: string): string {
  return query.trim().toLowerCase();
}

function includes(field: string, term: string): boolean {
  return field.toLowerCase().includes(term);
}
