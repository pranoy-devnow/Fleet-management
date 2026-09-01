import type { AccountUser, PortalRole } from "../types";

/**
 * Fixture users for each portal. There is no real session, so the header
 * picks one from the current path.
 */
export const ACCOUNT_USERS: Record<PortalRole, AccountUser> = {
  internal: {
    name: "Sarah Chen",
    email: "sarah.chen@medela.com",
    roleLabel: "Medela Internal",
    organization: "Clinical Engineering",
    initials: "SC",
  },
  biomed: {
    name: "Dr. Marco Rossi",
    email: "bioeng@charite.de",
    roleLabel: "Biomed / Hospital Staff",
    organization: "Charité Universitätsmedizin",
    initials: "MR",
  },
};
