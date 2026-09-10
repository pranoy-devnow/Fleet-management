import { describe, expect, it } from "vitest";

import type { FirmwareRelease } from "../types";
import { filterFirmwareReleases, hasActiveFirmwareSearch } from "./filter-releases";

const releases: FirmwareRelease[] = [
  { version: "v2.4.0", date: "2025-12-10", region: "All regions", deviceType: "Symphony", status: "active", devices: 10, notes: "Battery optimisation" },
  { version: "v2.0.0", date: "2024-06-01", region: "Europe", deviceType: "Swing Maxi", status: "recalled", devices: 0, notes: "Do not deploy" },
];

describe("filterFirmwareReleases", () => {
  it("returns every release when search is empty", () => {
    expect(filterFirmwareReleases(releases, "")).toEqual(releases);
  });

  it("returns every release when search is only whitespace", () => {
    expect(filterFirmwareReleases(releases, "   ")).toEqual(releases);
  });

  it("matches release notes case-insensitively", () => {
    expect(filterFirmwareReleases(releases, "BATTERY").map((item) => item.version)).toEqual([
      "v2.4.0",
    ]);
  });

  it("matches device type", () => {
    expect(filterFirmwareReleases(releases, "swing").map((item) => item.version)).toEqual([
      "v2.0.0",
    ]);
  });

  it("matches region", () => {
    expect(filterFirmwareReleases(releases, "europe").map((item) => item.version)).toEqual([
      "v2.0.0",
    ]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterFirmwareReleases(releases, "no-such-release")).toEqual([]);
  });
});

describe("hasActiveFirmwareSearch", () => {
  it("returns false for an empty query", () => {
    expect(hasActiveFirmwareSearch("")).toBe(false);
  });

  it("returns false for whitespace", () => {
    expect(hasActiveFirmwareSearch("  ")).toBe(false);
  });

  it("returns true when a term is present", () => {
    expect(hasActiveFirmwareSearch("v2")).toBe(true);
  });
});
