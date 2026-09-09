import { describe, expect, it } from "vitest";

import { signInHref, signUpHref } from "./account-routes";

describe("signUpHref", () => {
  it("sends Medela staff to the internal registration flow", () => {
    expect(signUpHref("medela")).toBe("/register/medela");
  });

  it("sends hospital biomeds to the biomed registration flow", () => {
    expect(signUpHref("biomed")).toBe("/register/biomed");
  });
});

describe("signInHref", () => {
  it("sends Medela staff to the internal sign-in form", () => {
    expect(signInHref("medela")).toBe("/login/medela");
  });

  it("sends hospital biomeds to the biomed sign-in form", () => {
    expect(signInHref("biomed")).toBe("/login/biomed");
  });

  it("stays on a different path from sign-up for the same account type", () => {
    expect(signInHref("biomed")).not.toBe(signUpHref("biomed"));
  });
});
