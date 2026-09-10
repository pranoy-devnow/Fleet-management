import { describe, expect, it } from "vitest";

import {
  ACCOUNT_HOME_HREF,
  ACCOUNT_PROFILE_HREF,
  ACCOUNT_ROLES_HREF,
  SIGN_OUT_HREF,
  getAccountUser,
} from "./current-user";

describe("account hrefs", () => {
  it("keeps profile and roles under the internal portal", () => {
    expect(ACCOUNT_HOME_HREF).toBe("/internal");
    expect(ACCOUNT_PROFILE_HREF).toBe("/internal/profile");
    expect(ACCOUNT_ROLES_HREF).toBe("/internal/roles");
  });

  it("returns log out to Medela sign-in", () => {
    expect(SIGN_OUT_HREF).toBe("/login/medela");
  });
});

describe("getAccountUser", () => {
  it("returns the Medela staff fixture", () => {
    expect(getAccountUser().email).toBe("sarah.chen@medela.com");
  });
});
