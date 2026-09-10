import { describe, expect, it } from "vitest";

import { emptyDeviceFilters, resetDeviceFilter } from "./device-filters";

describe("emptyDeviceFilters", () => {
  it("leaves every facet open by default", () => {
    expect(emptyDeviceFilters()).toEqual({
      status: "all",
      search: "",
    });
  });

  it("pins the starting status so a deep link can preselect it", () => {
    expect(emptyDeviceFilters("failed").status).toBe("failed");
  });
});

describe("resetDeviceFilter", () => {
  it("clears the named facet and keeps the rest", () => {
    const filters = { ...emptyDeviceFilters(), status: "failed", search: "berlin" };

    const result = resetDeviceFilter(filters, "status");

    expect(result.status).toBe("all");
    expect(result.search).toBe("berlin");
  });

  it("clears search to an empty string rather than the all sentinel", () => {
    const filters = { ...emptyDeviceFilters(), search: "berlin" };

    expect(resetDeviceFilter(filters, "search").search).toBe("");
  });

  it("does not mutate the filters it was given", () => {
    const filters = { ...emptyDeviceFilters(), status: "failed" };

    resetDeviceFilter(filters, "status");

    expect(filters.status).toBe("failed");
  });
});
