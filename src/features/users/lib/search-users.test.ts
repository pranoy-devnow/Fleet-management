import { describe, expect, it } from "vitest";

import type { MedelaUser } from "../types";
import { searchMedelaUsers } from "./search-users";

const medela: MedelaUser[] = [
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

describe("searchMedelaUsers", () => {
  it("returns everyone for a blank query", () => {
    expect(searchMedelaUsers(medela, "")).toHaveLength(2);
  });

  it("returns everyone for a whitespace-only query", () => {
    expect(searchMedelaUsers(medela, "   ")).toHaveLength(2);
  });

  it("matches on name", () => {
    const result = searchMedelaUsers(medela, "tobias");
    expect(result.map((user) => user.id)).toEqual(["mu-03"]);
  });

  it("matches on email", () => {
    const result = searchMedelaUsers(medela, "sarah.chen@");
    expect(result.map((user) => user.id)).toEqual(["mu-01"]);
  });

  it("returns every member of a department when the department is searched", () => {
    const result = searchMedelaUsers(medela, "field service");
    expect(result.map((user) => user.id)).toEqual(["mu-03"]);
  });

  it("ignores case and surrounding whitespace", () => {
    expect(searchMedelaUsers(medela, "  SARAH  ")).toHaveLength(1);
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchMedelaUsers(medela, "zzz")).toEqual([]);
  });

  it("does not alias the input list", () => {
    expect(searchMedelaUsers(medela, "")).not.toBe(medela);
  });
});
