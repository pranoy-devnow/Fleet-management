import { describe, expect, it } from "vitest";

import type { FirmwareRelease } from "@/features/firmware/types";

import { availableFirmwareUpdates } from "./available-updates";

const releases: FirmwareRelease[] = [
  { version: "v2.4.0", date: "2025-12-10", region: "All regions", deviceType: "Freestyle Hands-free", status: "active", devices: 10, notes: "Battery optimisation", uploadedBy: "Sarah Chen" },
  { version: "v2.5.0", date: "2026-01-01", region: "All regions", deviceType: "Symphony", status: "active", devices: 4, notes: "Symphony only", uploadedBy: "Sarah Chen" },
  { version: "v2.6.0", date: "2026-02-01", region: "All regions", deviceType: "Freestyle Hands-free", status: "recalled", devices: 0, notes: "Do not deploy", uploadedBy: "Sarah Chen" },
  { version: "v2.3.1", date: "2025-09-04", region: "Europe", deviceType: "Freestyle Hands-free", status: "superseded", devices: 8, notes: "EU patch", uploadedBy: "Sarah Chen" },
  { version: "v2.3.0", date: "2025-07-18", region: "All regions", deviceType: "Freestyle Hands-free", status: "superseded", devices: 8, notes: "OTA engine", uploadedBy: "Sarah Chen" },
];

const freestyle = { firmware: "v2.3.1", model: "Freestyle Hands-free" };

describe("availableFirmwareUpdates", () => {
  it("lists other versions for the device type, newest first", () => {
    expect(availableFirmwareUpdates(freestyle, releases).map((offer) => offer.version)).toEqual([
      "v2.4.0",
      "v2.3.0",
    ]);
  });

  it("omits the version already installed", () => {
    expect(
      availableFirmwareUpdates(freestyle, releases).some((offer) => offer.version === "v2.3.1"),
    ).toBe(false);
  });

  it("skips a recalled package", () => {
    expect(availableFirmwareUpdates(freestyle, releases).map((offer) => offer.version)).not.toContain(
      "v2.6.0",
    );
  });

  it("does not offer a package for a different device type", () => {
    expect(availableFirmwareUpdates(freestyle, [releases[1]!])).toEqual([]);
  });

  it("returns an empty list when nothing else is installable", () => {
    expect(availableFirmwareUpdates({ ...freestyle, firmware: "v2.4.0" }, [releases[0]!])).toEqual([]);
  });
});
