import { describe, expect, it } from "vitest";

import type { DeviceFilters, WorldDevice } from "../types";
import { filterWorldDevices, hasActiveDeviceFilters } from "./filter-devices";

const devices: WorldDevice[] = [
  {
    id: "KF-1",
    city: "Berlin",
    country: "Germany",
    region: "europe",
    lat: 52,
    lon: 13,
    status: "needs-update",
    hospital: "Charité — NICU Ward 3",
    firmware: "v2.3.1",
    model: "Symphony",
  },
  {
    id: "KF-2",
    city: "Tokyo",
    country: "Japan",
    region: "asia-pacific",
    lat: 35,
    lon: 139,
    status: "updated",
    hospital: "Tokyo University Hospital",
    firmware: "v2.4.0",
    model: "Swing Maxi",
  },
];

const openFilters: DeviceFilters = {
  region: "all",
  status: "all",
  model: "all",
  hospital: "all",
  search: "",
};

describe("filterWorldDevices", () => {
  it("returns every device when all filters are default", () => {
    expect(filterWorldDevices(devices, openFilters)).toHaveLength(2);
  });

  it("returns only devices in the selected region", () => {
    const result = filterWorldDevices(devices, { ...openFilters, region: "europe" });
    expect(result.map((device) => device.id)).toEqual(["KF-1"]);
  });

  it("returns an empty list when no device matches the search", () => {
    const result = filterWorldDevices(devices, { ...openFilters, search: "zzz" });
    expect(result).toEqual([]);
  });

  it("matches hospital with a partial, case-insensitive name", () => {
    const result = filterWorldDevices(devices, { ...openFilters, hospital: "charité" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("KF-1");
  });
});

describe("hasActiveDeviceFilters", () => {
  it("returns false for the default filter set", () => {
    expect(hasActiveDeviceFilters(openFilters)).toBe(false);
  });

  it("returns true when search has non-whitespace text", () => {
    expect(hasActiveDeviceFilters({ ...openFilters, search: " berlin " })).toBe(true);
  });
});
