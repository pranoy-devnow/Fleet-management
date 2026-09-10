import { describe, expect, it } from "vitest";

import { createPublishedRelease } from "./create-published-release";

const input = {
  version: "v2.5.0",
  notes: "Connectivity fix",
} as const;

describe("createPublishedRelease", () => {
  it("stores version and notes on a fleet-wide release", () => {
    const release = createPublishedRelease(
      input,
      new Date("2026-09-10T12:00:00.000Z"),
      "Sarah Chen",
    );

    expect(release).toMatchObject({
      version: "v2.5.0",
      notes: "Connectivity fix",
      region: "All regions",
      deviceType: "All device types",
      date: "2026-09-10",
      status: "active",
      devices: 0,
      uploadedBy: "Sarah Chen",
    });
  });

  it("does not copy extra fields from the input", () => {
    const release = createPublishedRelease(
      input,
      new Date("2026-09-10T12:00:00.000Z"),
      "Sarah Chen",
    );
    expect(release).not.toHaveProperty("hospital");
  });
});
