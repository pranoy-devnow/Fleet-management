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
  status: "Status",
  search: "Search",
};

/**
 * Describes every active filter for the chip row.
 *
 * Status is excluded because the segmented control already shows it, and one
 * filter should have one UI path.
 *
 * @param filters - Current filter state
 * @returns One entry per narrowed facet, in chip display order
 */
export function describeDeviceFilters(filters: DeviceFilters): DescribedFilter[] {
  const search = filters.search.trim();
  if (search === "") return [];
  return [{ key: "search", facetLabel: DEVICE_FACET_LABELS.search, valueLabel: `"${search}"` }];
}
