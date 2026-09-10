import { getAccountUser } from "@/features/account/lib/current-user";
import { initialsFromName } from "@/features/shell/lib/initials-from-name";
import type { SignOffPerson } from "@/features/shell/sign-off-card";

/**
 * Builds the person row for a firmware attribution card.
 * The signed-in fixture supplies email and organisation when the name matches.
 *
 * @param name - Display name stored on the release or the current user
 */
export function signOffPersonFromName(name: string): SignOffPerson {
  const user = getAccountUser();
  if (user.name === name) {
    return {
      name: user.name,
      initials: user.initials,
      detail: `${user.email} · ${user.organization}`,
    };
  }
  return { name, initials: initialsFromName(name) };
}
