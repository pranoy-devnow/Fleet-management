import { describe, expect, it } from "vitest";

import type { FirmwareRelease } from "@/features/firmware/types";

import { buildDeviceFirmwareLog } from "./device-firmware-log";

const releases: FirmwareRelease[] = [
  { version: "v2.4.0", date: "2025-12-10", region: "All regions", deviceType: "Freestyle Hands-free", status: "active", devices: 10, notes: "Battery", uploadedBy: "Sarah Chen" },
  { version: "v2.3.1", date: "2025-09-04", region: "Europe", deviceType: "Freestyle Hands-free", status: "superseded", devices: 8, notes: "EU patch", uploadedBy: "Sarah Chen" },
  { version: "v2.3.0", date: "2025-07-18", region: "All regions", deviceType: "Freestyle Hands-free", status: "superseded", devices: 8, notes: "OTA engine", uploadedBy: "Sarah Chen" },
  { version: "v2.3.1", date: "2025-09-04", region: "Europe", deviceType: "Symphony", status: "superseded", devices: 2, notes: "Wrong model", uploadedBy: "Sarah Chen" },
  { version: "v2.0.0", date: "2024-06-01", region: "Europe", deviceType: "Freestyle Hands-free", status: "recalled", devices: 0, notes: "Recalled", uploadedBy: "Sarah Chen" },
];

describe("buildDeviceFirmwareLog", () => {
  it("lists current and older versions for the device type, newest first", () => {
    const log = buildDeviceFirmwareLog({ firmware: "v2.3.1", model: "Freestyle Hands-free" }, releases);
    expect(log.map((entry) => entry.version)).toEqual(["v2.3.1", "v2.3.0"]);
  });

  it("copies notes and the uploader from the catalog", () => {
    const log = buildDeviceFirmwareLog({ firmware: "v2.3.1", model: "Freestyle Hands-free" }, releases);
    expect(log[0]).toMatchObject({
      notes: "EU patch",
      uploadedBy: "Sarah Chen",
    });
  });

  it("omits newer packages the device has not installed", () => {
    const log = buildDeviceFirmwareLog({ firmware: "v2.3.1", model: "Freestyle Hands-free" }, releases);
    expect(log.some((entry) => entry.version === "v2.4.0")).toBe(false);
  });

  it("returns an empty log when nothing matches the device type", () => {
    expect(buildDeviceFirmwareLog({ firmware: "v2.3.1", model: "Swing Maxi" }, releases)).toEqual([]);
  });
});
