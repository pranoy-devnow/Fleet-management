import type { AccessRequest } from "../types";

/**
 * People waiting on an admin decision. Accepting one is what makes the Admin
 * role's `requests:review` permission visible in the prototype.
 */
export const ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: "ar-01",
    name: "Nina Brandt",
    email: "nina.brandt@medela.com",
    department: "Field Service",
    requestedRole: "it",
    requestedOn: "2025-12-16",
    initials: "NB",
  },
  {
    id: "ar-02",
    name: "Omar Haddad",
    email: "omar.haddad@medela.com",
    department: "IT / Infrastructure",
    requestedRole: "it",
    requestedOn: "2025-12-17",
    initials: "OH",
  },
  {
    id: "ar-03",
    name: "Elena Petrova",
    email: "elena.petrova@medela.com",
    department: "Product Management",
    requestedRole: "admin",
    requestedOn: "2025-12-18",
    initials: "EP",
  },
];
