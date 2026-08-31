import { describe, expect, it } from "vitest";

import { emptyDeviceFilters, resetDeviceFilter } from "./device-filters";

describe("emptyDeviceFilters", () => {
  it("leaves every facet open by default", () => {
    expect(emptyDeviceFilters()).toEqual({
      region: "all",
      status: "all",
      model: "all",
      hospital: "all",
      search: "",
    });
  });

  it("pins the starting status so a deep link can preselect it", () => {
    expect(emptyDeviceFilters("failed").status).toBe("failed");
  });
});

describe("resetDeviceFilter", () => {
  it("clears the named facet and keeps the rest", () => {
    const filters = { ...emptyDeviceFilters(), region: "europe", status: "failed" };

    const result = resetDeviceFilter(filters, "region");

    expect(result.region).toBe("all");
    expect(result.status).toBe("failed");
  });

  it("clears search to an empty string rather than the all sentinel", () => {
    const filters = { ...emptyDeviceFilters(), search: "berlin" };

    expect(resetDeviceFilter(filters, "search").search).toBe("");
  });

  it("does not mutate the filters it was given", () => {
    const filters = { ...emptyDeviceFilters(), region: "europe" };

    resetDeviceFilter(filters, "region");

    expect(filters.region).toBe("europe");
  });
});
