import { describe, expect, it } from "vitest";

import type { AccessRequest } from "../types";
import { createAccessRequestStore } from "./access-request-store";

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

describe("createAccessRequestStore", () => {
  it("starts with the given queue", () => {
    const store = createAccessRequestStore([nina, omar]);
    expect(store.getSnapshot()).toHaveLength(2);
  });

  it("notifies subscribers when a request is decided", () => {
    const store = createAccessRequestStore([nina, omar]);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    store.decide("ar-01", "rejected");

    expect(heard).toBe(1);
    expect(store.getSnapshot()).toHaveLength(1);
  });

  it("returns the accepted person so the directory can admit them", () => {
    const store = createAccessRequestStore([nina]);
    expect(store.decide("ar-01", "accepted")).toEqual(nina);
  });

  it("does not notify when the request is already gone", () => {
    const store = createAccessRequestStore([nina]);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    expect(store.decide("nope", "accepted")).toBeNull();
    expect(heard).toBe(0);
  });
});
