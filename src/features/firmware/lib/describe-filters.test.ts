import { describe, expect, it } from "vitest";

import { describeFirmwareFilters } from "./describe-filters";
import { emptyFirmwareFilters, resetFirmwareFilter } from "./firmware-filters";

const openFilters = emptyFirmwareFilters();

describe("describeFirmwareFilters", () => {
  it("returns nothing when no filter is narrowing the list", () => {
    expect(describeFirmwareFilters(openFilters)).toEqual([]);
  });

  it("describes the region facet with its option label", () => {
    const result = describeFirmwareFilters({ ...openFilters, region: "Europe" });
    expect(result).toEqual([
      { key: "region", facetLabel: "Region", valueLabel: "Europe" },
    ]);
  });

  it("excludes status because the segmented control already shows it", () => {
    expect(describeFirmwareFilters({ ...openFilters, status: "recalled" })).toEqual([]);
  });

  it("quotes the search term so it reads as free text", () => {
    const result = describeFirmwareFilters({ ...openFilters, search: "v2.4" });
    expect(result[0]?.valueLabel).toBe('"v2.4"');
  });

  it("ignores a search of only whitespace", () => {
    expect(describeFirmwareFilters({ ...openFilters, search: "  " })).toEqual([]);
  });

  it("describes every active facet in chip order", () => {
    const result = describeFirmwareFilters({
      region: "Europe",
      model: "Symphony",
      status: "active",
      search: "notes",
    });
    expect(result.map((filter) => filter.key)).toEqual(["region", "model", "search"]);
  });
});

describe("resetFirmwareFilter", () => {
  it("clears the named facet and keeps the rest", () => {
    const filters = { ...openFilters, region: "Europe", status: "recalled" };

    const result = resetFirmwareFilter(filters, "region");

    expect(result.region).toBe("all");
    expect(result.status).toBe("recalled");
  });

  it("clears search to an empty string rather than the all sentinel", () => {
    expect(resetFirmwareFilter({ ...openFilters, search: "v2" }, "search").search).toBe("");
  });
});
