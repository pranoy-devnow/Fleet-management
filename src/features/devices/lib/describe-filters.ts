import { ALL_FILTER_VALUE } from "@/lib/filters";

import { MODEL_OPTIONS, REGION_OPTIONS } from "../constants";
import type { DeviceFilters } from "../types";
import type { DeviceFilterKey } from "./device-filters";

/**
 * An active filter resolved to the labels a chip should show.
 */
export type DescribedFilter = {
  key: DeviceFilterKey;
  facetLabel: string;
  valueLabel: string;
};

/** Human-readable facet names, used by chips and by the empty-state hint. */
export const DEVICE_FACET_LABELS: Record<DeviceFilterKey, string> = {
  region: "Region",
  status: "Status",
  model: "Model",
  hospital: "Hospital",
  search: "Search",
};

/**
 * Describes every active filter for the chip row.
 *
 * Status is deliberately excluded: it lives in the always-visible segmented
 * control, and duplicating it as a chip would give one filter two UI paths.
 *
 * @param filters - Current filter state
 * @returns One entry per narrowed facet, in chip display order
 */
export function describeDeviceFilters(filters: DeviceFilters): DescribedFilter[] {
  const described: DescribedFilter[] = [];

  if (filters.region !== ALL_FILTER_VALUE) {
    described.push(describe("region", labelFor(REGION_OPTIONS, filters.region)));
  }
  if (filters.model !== ALL_FILTER_VALUE) {
    described.push(describe("model", labelFor(MODEL_OPTIONS, filters.model)));
  }
  if (filters.hospital !== ALL_FILTER_VALUE) {
    described.push(describe("hospital", filters.hospital));
  }

  const search = filters.search.trim();
  if (search !== "") {
    described.push(describe("search", `"${search}"`));
  }

  return described;
}

function describe(key: DeviceFilterKey, valueLabel: string): DescribedFilter {
  return { key, facetLabel: DEVICE_FACET_LABELS[key], valueLabel };
}

/**
 * Resolves a stored filter value to its option label, falling back to the raw
 * value so a slug missing from the options list still reads sensibly.
 */
function labelFor(
  options: ReadonlyArray<readonly [string, string]>,
  value: string,
): string {
  return options.find(([optionValue]) => optionValue === value)?.[1] ?? value;
}
