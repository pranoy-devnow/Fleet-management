import { describe, expect, it } from "vitest";

import { updateProgressAt, updateStageAt } from "./update-progress";

describe("updateProgressAt", () => {
  it("returns 0 at the start", () => {
    expect(updateProgressAt(0, 12_000)).toBe(0);
  });

  it("returns 1 when the duration has elapsed", () => {
    expect(updateProgressAt(12_000, 12_000)).toBe(1);
  });

  it("returns 1 when the duration is not positive", () => {
    expect(updateProgressAt(100, 0)).toBe(1);
  });
});

describe("updateStageAt", () => {
  it("starts on preparing", () => {
    expect(updateStageAt(0).id).toBe("preparing");
  });

  it("moves to installing in the middle of the run", () => {
    expect(updateStageAt(0.5).id).toBe("installing");
  });

  it("says done only when progress is complete", () => {
    expect(updateStageAt(0.99).id).toBe("verifying");
    expect(updateStageAt(1).label).toBe("Done");
  });
});
