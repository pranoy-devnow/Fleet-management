import { describe, expect, it } from "vitest";

import type { HospitalUser, MedelaUser } from "../types";
import { searchHospitalUsers, searchMedelaUsers } from "./search-users";

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

const hospital: HospitalUser[] = [
  {
    id: "hu-01",
    name: "Dr. Marco Rossi",
    email: "bioeng@charite.de",
    hospital: "Charité — NICU Ward 3",
    city: "Berlin",
    country: "Germany",
    initials: "MR",
  },
  {
    id: "hu-07",
    name: "Kenji Sato",
    email: "k.sato@todai-hosp.jp",
    hospital: "Tokyo University Hospital",
    city: "Tokyo",
    country: "Japan",
    initials: "KS",
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

describe("searchHospitalUsers", () => {
  it("returns everyone for a blank query", () => {
    expect(searchHospitalUsers(hospital, "")).toHaveLength(2);
  });

  it("matches on hospital name", () => {
    const result = searchHospitalUsers(hospital, "charité");
    expect(result.map((user) => user.id)).toEqual(["hu-01"]);
  });

  it("matches on city", () => {
    const result = searchHospitalUsers(hospital, "tokyo");
    expect(result.map((user) => user.id)).toEqual(["hu-07"]);
  });

  it("matches on country", () => {
    const result = searchHospitalUsers(hospital, "germany");
    expect(result.map((user) => user.id)).toEqual(["hu-01"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchHospitalUsers(hospital, "zzz")).toEqual([]);
  });
});
