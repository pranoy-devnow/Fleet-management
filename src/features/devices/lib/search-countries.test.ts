import { describe, expect, it } from "vitest";

import type { DeviceCountry } from "../types";
import { searchDeviceCountries } from "./search-countries";

const countries: DeviceCountry[] = [
  { country: "Germany", regionLabel: "Europe" },
  { country: "UK", regionLabel: "Europe" },
  { country: "USA", regionLabel: "North America" },
  { country: "Japan", regionLabel: "Asia Pacific" },
];

describe("searchDeviceCountries", () => {
  it("returns every country for a blank query", () => {
    expect(searchDeviceCountries(countries, "")).toHaveLength(4);
  });

  it("returns every country for a whitespace-only query", () => {
    expect(searchDeviceCountries(countries, "   ")).toHaveLength(4);
  });

  it("matches on country name", () => {
    const result = searchDeviceCountries(countries, "japan");
    expect(result.map((entry) => entry.country)).toEqual(["Japan"]);
  });

  it("returns every country in a region when the region is searched", () => {
    const result = searchDeviceCountries(countries, "europe");
    expect(result.map((entry) => entry.country)).toEqual(["Germany", "UK"]);
  });

  it("ignores case and surrounding whitespace", () => {
    expect(searchDeviceCountries(countries, "  GERMANY  ")).toHaveLength(1);
  });

  it("matches a partial region label", () => {
    const result = searchDeviceCountries(countries, "north");
    expect(result.map((entry) => entry.country)).toEqual(["USA"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchDeviceCountries(countries, "zzz")).toEqual([]);
  });

  it("does not alias the input list", () => {
    const result = searchDeviceCountries(countries, "");
    expect(result).not.toBe(countries);
  });
});
