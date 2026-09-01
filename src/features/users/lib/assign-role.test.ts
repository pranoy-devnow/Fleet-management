import { describe, expect, it } from "vitest";

import type { MedelaUser } from "../types";
import { assignRole } from "./assign-role";

function makeUsers(): MedelaUser[] {
  return [
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
}

describe("assignRole", () => {
  it("changes the named user's role", () => {
    const result = assignRole(makeUsers(), "mu-03", "admin");
    expect(result.find((user) => user.id === "mu-03")?.role).toBe("admin");
  });

  it("leaves other users untouched", () => {
    const result = assignRole(makeUsers(), "mu-03", "admin");
    expect(result.find((user) => user.id === "mu-01")?.role).toBe("admin");
  });

  it("keeps every other field on the changed user", () => {
    const result = assignRole(makeUsers(), "mu-03", "admin");
    expect(result.find((user) => user.id === "mu-03")?.department).toBe("Field Service");
  });

  it("does not mutate the list it was given", () => {
    const users = makeUsers();

    assignRole(users, "mu-03", "admin");

    expect(users[1]?.role).toBe("it");
  });

  it("returns an unchanged copy for an unknown user", () => {
    const users = makeUsers();

    const result = assignRole(users, "nope", "admin");

    expect(result).toEqual(users);
    expect(result).not.toBe(users);
  });

  it("is a no-op when the user already holds the role", () => {
    const result = assignRole(makeUsers(), "mu-01", "admin");
    expect(result.find((user) => user.id === "mu-01")?.role).toBe("admin");
  });
});
