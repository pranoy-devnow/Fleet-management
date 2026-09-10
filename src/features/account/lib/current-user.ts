import { CURRENT_USER } from "../data/users";
import type { AccountUser } from "../types";

/** Overview for the signed-in Medela Internal user. */
export const ACCOUNT_HOME_HREF = "/internal";

/** Profile page for the signed-in Medela Internal user. */
export const ACCOUNT_PROFILE_HREF = "/internal/profile";

/** User-management page for Medela Internal staff. */
export const ACCOUNT_ROLES_HREF = "/internal/roles";

/** Sign-in form. Log out returns here because there is no session to clear. */
export const SIGN_OUT_HREF = "/login/medela";

/**
 * Prototype signed-in Medela staff user. Does not throw — there is one fixture.
 *
 * @returns The internal account fixture
 */
export function getAccountUser(): AccountUser {
  return CURRENT_USER;
}
