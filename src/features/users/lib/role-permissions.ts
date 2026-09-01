import { ROLE_PERMISSIONS } from "../constants";
import type { MedelaUser, Permission, PlatformRole } from "../types";

/**
 * Permissions granted by a role.
 *
 * @param role - Role to expand
 * @returns The role's permissions; never undefined, every role has an entry
 */
export function permissionsForRole(role: PlatformRole): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}

/**
 * Whether a role grants a permission.
 *
 * @param role - Role to check, or null when the viewer is not in the directory
 * @param permission - Permission being tested
 */
export function hasPermission(
  role: PlatformRole | null,
  permission: Permission,
): boolean {
  if (role === null) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Looks up a staff member's role by email, which is how the signed-in account
 * is matched to the directory while there is no real session.
 *
 * @param users - Staff list to search
 * @param email - Address to match, compared case-insensitively
 * @returns The role, or null when the address is not in the directory
 */
export function findRoleByEmail(
  users: readonly MedelaUser[],
  email: string,
): PlatformRole | null {
  const target = email.trim().toLowerCase();
  const match = users.find((user) => user.email.toLowerCase() === target);
  return match?.role ?? null;
}
