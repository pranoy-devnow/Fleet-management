import { describe, expect, it } from "vitest";

import { shortenReleaseNotes } from "./shorten-release-notes";

describe("shortenReleaseNotes", () => {
  it("keeps the clause before an em dash", () => {
    expect(shortenReleaseNotes("EU compliance patch — CE re-certification.")).toBe(
      "EU compliance patch",
    );
  });

  it("keeps the clause before a comma", () => {
    expect(shortenReleaseNotes("Battery optimisation, improved connectivity stability.")).toBe(
      "Battery optimisation",
    );
  });

  it("strips a trailing period from a single clause", () => {
    expect(shortenReleaseNotes("Sensor calibration fix.")).toBe("Sensor calibration fix");
  });

  it("returns an empty string when notes are blank", () => {
    expect(shortenReleaseNotes("   ")).toBe("");
  });
});
