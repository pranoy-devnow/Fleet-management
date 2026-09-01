import type { MedelaUser, PlatformRole } from "../types";

/**
 * Returns the staff list with one user's role replaced.
 *
 * @param users - Current staff list
 * @param userId - Who to change
 * @param role - Role to assign
 * @returns A new array; the input and its entries are not mutated. An unknown
 *   `userId` yields an unchanged copy rather than throwing, since the list and
 *   the menu can only disagree if a row was removed mid-interaction.
 */
export function assignRole(
  users: readonly MedelaUser[],
  userId: string,
  role: PlatformRole,
): MedelaUser[] {
  return users.map((user) => (user.id === userId ? { ...user, role } : user));
}
