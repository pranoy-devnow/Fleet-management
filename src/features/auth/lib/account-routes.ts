import type { AccountType } from "@/features/auth/types";

/**
 * Where a chosen account type sends someone who wants to create an account.
 *
 * @param accountType - Portal the account belongs to
 * @returns Path to that portal's registration flow
 */
export function signUpHref(accountType: AccountType): string {
  return `/register/${accountType}`;
}

/**
 * Where a chosen account type sends someone who already has an account.
 *
 * @param accountType - Portal the account belongs to
 * @returns Path to that portal's sign-in form
 */
export function signInHref(accountType: AccountType): string {
  return `/login/${accountType}`;
}
