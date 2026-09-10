import { describe, expect, it } from "vitest";

import { describeDeviceFilters } from "./describe-filters";
import { emptyDeviceFilters } from "./device-filters";

const openFilters = emptyDeviceFilters();

describe("describeDeviceFilters", () => {
  it("returns nothing when no filter is narrowing the list", () => {
    expect(describeDeviceFilters(openFilters)).toEqual([]);
  });

  it("excludes status because the segmented control already shows it", () => {
    const result = describeDeviceFilters({ ...openFilters, status: "failed" });
    expect(result).toEqual([]);
  });

  it("quotes the search term so it reads as free text", () => {
    const result = describeDeviceFilters({ ...openFilters, search: "berlin" });
    expect(result[0]).toEqual({
      key: "search",
      facetLabel: "Search",
      valueLabel: '"berlin"',
    });
  });

  it("ignores a search of only whitespace", () => {
    expect(describeDeviceFilters({ ...openFilters, search: "   " })).toEqual([]);
  });
});
