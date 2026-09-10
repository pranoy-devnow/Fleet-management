import { describe, expect, it } from "vitest";

import { createPublishedRelease } from "./create-published-release";

const input = {
  version: "v2.5.0",
  notes: "Connectivity fix",
  region: "Europe",
  deviceType: "Symphony",
} as const;

describe("createPublishedRelease", () => {
  it("stores the selected region and device type on the release", () => {
    const release = createPublishedRelease(input, new Date("2026-09-10T12:00:00.000Z"));

    expect(release).toMatchObject({
      version: "v2.5.0",
      notes: "Connectivity fix",
      region: "Europe",
      deviceType: "Symphony",
      date: "2026-09-10",
      status: "active",
      devices: 0,
    });
  });

  it("keeps an all-regions all-device-types target", () => {
    const release = createPublishedRelease(
      { ...input, region: "All regions", deviceType: "All device types" },
      new Date("2026-01-01T00:00:00.000Z"),
    );

    expect(release.region).toBe("All regions");
    expect(release.deviceType).toBe("All device types");
  });

  it("does not copy extra fields from the input", () => {
    const release = createPublishedRelease(input, new Date("2026-09-10T12:00:00.000Z"));
    expect(release).not.toHaveProperty("hospital");
  });
});
