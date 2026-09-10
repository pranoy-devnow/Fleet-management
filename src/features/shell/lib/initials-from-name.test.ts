import { describe, expect, it } from "vitest";

import { initialsFromName } from "./initials-from-name";

describe("initialsFromName", () => {
  it("uses the first and last word", () => {
    expect(initialsFromName("Tobias Keller")).toBe("TK");
  });

  it("uses the first two letters of a single word", () => {
    expect(initialsFromName("Medela")).toBe("ME");
  });

  it("returns an empty string when the name is blank", () => {
    expect(initialsFromName("   ")).toBe("");
  });
});
