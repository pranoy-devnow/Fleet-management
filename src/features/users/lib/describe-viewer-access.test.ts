import { describe, expect, it } from "vitest";

import { describeViewerAccess } from "./describe-viewer-access";

describe("describeViewerAccess", () => {
  it("tells an Admin they have Admin access", () => {
    expect(describeViewerAccess("admin")).toBe("You have Admin access");
  });

  it("tells an IT viewer they have IT access", () => {
    expect(describeViewerAccess("it")).toBe("You have IT access");
  });

  it("falls back to a directory label when the viewer has no role", () => {
    expect(describeViewerAccess(null)).toBe("Directory of Medela users and hospital staff");
  });
});
