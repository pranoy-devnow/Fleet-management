import { describe, expect, it } from "vitest";

import {
  accountHomeHref,
  accountProfileHref,
  accountRolesHref,
  getAccountUser,
  resolvePortalRole,
} from "./current-user";

describe("resolvePortalRole", () => {
  it("treats biomed routes as hospital staff", () => {
    expect(resolvePortalRole("/biomed/devices/KF-1")).toBe("biomed");
  });

  it("treats every other authenticated path as internal", () => {
    expect(resolvePortalRole("/internal/firmware")).toBe("internal");
  });

  it("does not treat a path that merely contains biomed as hospital staff", () => {
    expect(resolvePortalRole("/internal/biomed-notes")).toBe("internal");
  });
});

describe("account hrefs", () => {
  it("keeps profile and roles under the current portal", () => {
    expect(accountHomeHref("biomed")).toBe("/biomed");
    expect(accountProfileHref("internal")).toBe("/internal/profile");
    expect(accountRolesHref("biomed")).toBe("/biomed/roles");
  });
});

describe("getAccountUser", () => {
  it("returns the Medela staff fixture for the internal portal", () => {
    expect(getAccountUser("internal").email).toBe("sarah.chen@medela.com");
  });

  it("returns the hospital fixture for the biomed portal", () => {
    expect(getAccountUser("biomed").name).toBe("Dr. Marco Rossi");
  });
});
