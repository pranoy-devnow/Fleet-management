import { describe, expect, it } from "vitest";

import type { WorldDevice } from "../types";
import { emptyDeviceFilters } from "./device-filters";
import { suggestFilterRelaxation } from "./suggest-filter-relaxation";

function makeDevice(overrides: Partial<WorldDevice> & { id: string }): WorldDevice {
  return {
    city: "Berlin",
    country: "Germany",
    region: "europe",
    lat: 52,
    lon: 13,
    status: "updated",
    hospital: "Charité",
    firmware: "v2.4.0",
    model: "Symphony",
    ...overrides,
  };
}

const devices: WorldDevice[] = [
  makeDevice({ id: "KF-1", status: "needs-update", model: "Symphony" }),
  makeDevice({ id: "KF-2", city: "Tokyo", region: "asia-pacific", model: "Swing Maxi" }),
  makeDevice({ id: "KF-3", city: "Munich", model: "Swing Maxi" }),
  makeDevice({ id: "KF-4", city: "Osaka", region: "asia-pacific", model: "Swing Maxi" }),
];

const openFilters = emptyDeviceFilters();

describe("suggestFilterRelaxation", () => {
  it("returns null when no filter is active", () => {
    expect(suggestFilterRelaxation(devices, openFilters)).toBeNull();
  });

  it("suggests the status filter when clearing it reveals the region again", () => {
    const result = suggestFilterRelaxation(devices, {
      ...openFilters,
      region: "europe",
      status: "failed",
    });

    expect(result).toEqual({ key: "status", facetLabel: "Status", count: 2 });
  });

  it("picks the removal that reveals the most devices, not the first one", () => {
    const result = suggestFilterRelaxation(devices, {
      ...openFilters,
      region: "asia-pacific",
      model: "Symphony",
    });

    // Clearing model leaves the two Asia Pacific devices; clearing region
    // leaves only the single Symphony.
    expect(result).toEqual({ key: "model", facetLabel: "Model", count: 2 });
  });

  it("breaks a tie in favour of the less intentional filter", () => {
    const result = suggestFilterRelaxation(devices, {
      ...openFilters,
      model: "Symphony",
      search: "tokyo",
    });

    expect(result?.key).toBe("model");
    expect(result?.count).toBe(1);
  });

  it("returns null when no single removal reveals anything", () => {
    const result = suggestFilterRelaxation(devices, {
      ...openFilters,
      region: "antarctica",
      search: "zzz",
    });

    expect(result).toBeNull();
  });

  it("returns null for an empty fleet", () => {
    expect(suggestFilterRelaxation([], { ...openFilters, region: "europe" })).toBeNull();
  });
});
