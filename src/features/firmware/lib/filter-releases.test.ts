import { describe, expect, it } from "vitest";

import type { FirmwareFilters, FirmwareRelease } from "../types";
import { filterFirmwareReleases, hasActiveFirmwareFilters } from "./filter-releases";

const releases: FirmwareRelease[] = [
  { version: "v2.4.0", date: "2025-12-10", region: "Global", model: "Symphony", status: "active", devices: 10, notes: "Battery optimisation" },
  { version: "v2.0.0", date: "2024-06-01", region: "Europe", model: "Swing Maxi", status: "recalled", devices: 0, notes: "Do not deploy" },
];

const openFilters: FirmwareFilters = {
  region: "all",
  model: "all",
  status: "all",
  search: "",
};

describe("filterFirmwareReleases", () => {
  it("returns every release when filters are default", () => {
    expect(filterFirmwareReleases(releases, openFilters)).toHaveLength(2);
  });

  it("returns only recalled releases when status is recalled", () => {
    const result = filterFirmwareReleases(releases, { ...openFilters, status: "recalled" });
    expect(result).toHaveLength(1);
    expect(result[0]?.version).toBe("v2.0.0");
  });

  it("matches release notes in search", () => {
    const result = filterFirmwareReleases(releases, { ...openFilters, search: "battery" });
    expect(result.map((item) => item.version)).toEqual(["v2.4.0"]);
  });
});

describe("hasActiveFirmwareFilters", () => {
  it("returns false for empty defaults", () => {
    expect(hasActiveFirmwareFilters(openFilters)).toBe(false);
  });

  it("returns true when a model is selected", () => {
    expect(hasActiveFirmwareFilters({ ...openFilters, model: "Symphony" })).toBe(true);
  });
});
