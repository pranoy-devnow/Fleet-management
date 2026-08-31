import { describe, expect, it } from "vitest";

import { describeDeviceFilters } from "./describe-filters";
import { emptyDeviceFilters } from "./device-filters";

const openFilters = emptyDeviceFilters();

describe("describeDeviceFilters", () => {
  it("returns nothing when no filter is narrowing the list", () => {
    expect(describeDeviceFilters(openFilters)).toEqual([]);
  });

  it("resolves a region slug to its option label", () => {
    const result = describeDeviceFilters({ ...openFilters, region: "asia-pacific" });
    expect(result).toEqual([
      { key: "region", facetLabel: "Region", valueLabel: "Asia Pacific" },
    ]);
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

  it("falls back to the raw value for a slug missing from the options list", () => {
    const result = describeDeviceFilters({ ...openFilters, region: "antarctica" });
    expect(result[0]?.valueLabel).toBe("antarctica");
  });

  it("describes every active facet in chip order", () => {
    const result = describeDeviceFilters({
      region: "europe",
      status: "failed",
      model: "Symphony",
      hospital: "Charité",
      search: "kf",
    });
    expect(result.map((filter) => filter.key)).toEqual([
      "region",
      "model",
      "hospital",
      "search",
    ]);
  });
});
