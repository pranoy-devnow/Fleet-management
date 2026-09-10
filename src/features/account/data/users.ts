import type { AccountUser } from "../types";

/**
 * Fixture for the signed-in Medela Internal user. There is no real session, so
 * the header always shows this person.
 */
export const CURRENT_USER: AccountUser = {
  name: "Sarah Chen",
  email: "sarah.chen@medela.com",
  roleLabel: "Medela Internal",
  organization: "Clinical Engineering",
  initials: "SC",
};
