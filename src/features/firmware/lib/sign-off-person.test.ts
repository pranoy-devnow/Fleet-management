import { describe, expect, it } from "vitest";

import { signOffPersonFromName } from "./sign-off-person";

describe("signOffPersonFromName", () => {
  it("uses the account fixture when the name matches", () => {
    expect(signOffPersonFromName("Sarah Chen")).toEqual({
      name: "Sarah Chen",
      initials: "SC",
      detail: "sarah.chen@medela.com · Clinical Engineering",
    });
  });

  it("derives initials when the person is not the signed-in user", () => {
    expect(signOffPersonFromName("Tobias Keller")).toEqual({
      name: "Tobias Keller",
      initials: "TK",
    });
  });
});
