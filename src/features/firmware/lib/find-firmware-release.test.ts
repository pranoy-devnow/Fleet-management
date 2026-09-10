import { describe, expect, it } from "vitest";

import type { FirmwareRelease } from "../types";
import { findFirmwareRelease } from "./find-firmware-release";

const releases: FirmwareRelease[] = [
  { version: "v2.4.0", date: "2025-12-10", region: "All regions", deviceType: "Symphony", status: "active", devices: 10, notes: "Battery" },
  { version: "v2.4.0", date: "2025-12-10", region: "Europe", deviceType: "Swing Maxi", status: "active", devices: 4, notes: "EU" },
];

describe("findFirmwareRelease", () => {
  it("returns the release that matches version and device type", () => {
    expect(findFirmwareRelease(releases, "v2.4.0", "Symphony")?.notes).toBe("Battery");
  });

  it("does not match on version alone", () => {
    expect(findFirmwareRelease(releases, "v2.4.0", "Freestyle Hands-free")).toBeUndefined();
  });

  it("returns undefined when the list is empty", () => {
    expect(findFirmwareRelease([], "v2.4.0", "Symphony")).toBeUndefined();
  });
});
