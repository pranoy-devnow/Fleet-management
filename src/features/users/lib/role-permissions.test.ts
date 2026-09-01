import { describe, expect, it } from "vitest";

import type { MedelaUser } from "../types";
import { findRoleByEmail, hasPermission, permissionsForRole } from "./role-permissions";

const users: MedelaUser[] = [
  {
    id: "mu-01",
    name: "Sarah Chen",
    email: "sarah.chen@medela.com",
    department: "Clinical Engineering",
    role: "admin",
    initials: "SC",
  },
  {
    id: "mu-03",
    name: "Tobias Meyer",
    email: "tobias.meyer@medela.com",
    department: "Field Service",
    role: "it",
    initials: "TM",
  },
];

describe("permissionsForRole", () => {
  it("grants request review to Admin", () => {
    expect(permissionsForRole("admin")).toEqual(["requests:review"]);
  });

  it("grants overview and firmware upload to IT", () => {
    expect(permissionsForRole("it")).toEqual(["overview:view", "firmware:upload"]);
  });
});

describe("hasPermission", () => {
  it("lets an Admin review access requests", () => {
    expect(hasPermission("admin", "requests:review")).toBe(true);
  });

  it("does not let an Admin upload firmware, since the roles are disjoint", () => {
    expect(hasPermission("admin", "firmware:upload")).toBe(false);
  });

  it("does not let IT review access requests", () => {
    expect(hasPermission("it", "requests:review")).toBe(false);
  });

  it("denies everything when the viewer has no role", () => {
    expect(hasPermission(null, "overview:view")).toBe(false);
  });
});

describe("findRoleByEmail", () => {
  it("returns the role for a known address", () => {
    expect(findRoleByEmail(users, "tobias.meyer@medela.com")).toBe("it");
  });

  it("ignores case and surrounding whitespace", () => {
    expect(findRoleByEmail(users, "  SARAH.CHEN@MEDELA.COM ")).toBe("admin");
  });

  it("returns null for an address outside the directory", () => {
    expect(findRoleByEmail(users, "nobody@medela.com")).toBeNull();
  });

  it("returns null for an empty directory", () => {
    expect(findRoleByEmail([], "sarah.chen@medela.com")).toBeNull();
  });
});
