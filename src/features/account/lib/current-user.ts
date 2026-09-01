import { ACCOUNT_USERS } from "../data/users";
import type { AccountUser, PortalRole } from "../types";

/**
 * Resolves the portal from a path. Anything under `/biomed` is hospital staff;
 * every other authenticated route is Medela internal.
 *
 * @param pathname - Current URL path
 * @returns Portal the chrome should treat as signed in
 */
export function resolvePortalRole(pathname: string): PortalRole {
  return pathname.startsWith("/biomed") ? "biomed" : "internal";
}

/**
 * Home path for a portal.
 *
 * @param role - Portal to land on
 */
export function accountHomeHref(role: PortalRole): string {
  return role === "biomed" ? "/biomed" : "/internal";
}

/**
 * Profile page for the given portal.
 *
 * @param role - Portal whose account is being viewed
 */
export function accountProfileHref(role: PortalRole): string {
  return `${accountHomeHref(role)}/profile`;
}

/**
 * Role-management page for the given portal.
 *
 * @param role - Portal whose roles are being viewed
 */
export function accountRolesHref(role: PortalRole): string {
  return `${accountHomeHref(role)}/roles`;
}

/**
 * Prototype user for the portal. Does not throw — every role has a fixture.
 *
 * @param role - Portal to look up
 */
export function getAccountUser(role: PortalRole): AccountUser {
  return ACCOUNT_USERS[role];
}
