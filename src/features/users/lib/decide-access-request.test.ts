import { describe, expect, it } from "vitest";

import type { AccessRequest, MedelaUser } from "../types";
import {
  admitAcceptedUser,
  decideAccessRequest,
  medelaUserFromRequest,
} from "./decide-access-request";

const nina: AccessRequest = {
  id: "ar-01",
  name: "Nina Brandt",
  email: "nina.brandt@medela.com",
  department: "Field Service",
  requestedRole: "it",
  requestedOn: "2025-12-16",
  initials: "NB",
};

const omar: AccessRequest = {
  id: "ar-02",
  name: "Omar Haddad",
  email: "omar.haddad@medela.com",
  department: "IT / Infrastructure",
  requestedRole: "it",
  requestedOn: "2025-12-17",
  initials: "OH",
};

describe("decideAccessRequest", () => {
  it("drops an accepted request and returns that person", () => {
    const result = decideAccessRequest([nina, omar], "ar-01", "accepted");

    expect(result.requests.map((request) => request.id)).toEqual(["ar-02"]);
    expect(result.accepted).toEqual(nina);
  });

  it("drops a rejected request without returning the person", () => {
    const result = decideAccessRequest([nina, omar], "ar-01", "rejected");

    expect(result.requests.map((request) => request.id)).toEqual(["ar-02"]);
    expect(result.accepted).toBeNull();
  });

  it("leaves the queue unchanged for an unknown id", () => {
    const result = decideAccessRequest([nina], "nope", "accepted");

    expect(result.requests).toEqual([nina]);
    expect(result.accepted).toBeNull();
  });

  it("does not mutate the list it was given", () => {
    const requests = [nina, omar];

    decideAccessRequest(requests, "ar-01", "accepted");

    expect(requests).toHaveLength(2);
  });
});

describe("medelaUserFromRequest", () => {
  it("uses the role the person asked for", () => {
    expect(medelaUserFromRequest(nina).role).toBe("it");
  });
});

describe("admitAcceptedUser", () => {
  const sarah: MedelaUser = {
    id: "mu-01",
    name: "Sarah Chen",
    email: "sarah.chen@medela.com",
    department: "Clinical Engineering",
    role: "admin",
    initials: "SC",
  };

  it("inserts the person in name order", () => {
    const result = admitAcceptedUser([sarah], nina);

    expect(result.map((user) => user.name)).toEqual(["Nina Brandt", "Sarah Chen"]);
  });
});
