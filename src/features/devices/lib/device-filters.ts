import { ALL_FILTER_VALUE } from "@/lib/filters";

import type { DeviceFilters } from "../types";

/** Facets a device list can be narrowed by. */
export type DeviceFilterKey = keyof DeviceFilters;

/**
 * Filters with nothing narrowed, optionally pinned to a starting status so
 * routes like `/internal/devices?status=failed` can deep-link.
 *
 * @param status - Status to preselect; defaults to showing every status
 */
export function emptyDeviceFilters(status: string = ALL_FILTER_VALUE): DeviceFilters {
  return {
    region: ALL_FILTER_VALUE,
    status,
    model: ALL_FILTER_VALUE,
    hospital: ALL_FILTER_VALUE,
    search: "",
  };
}

/**
 * Clears one facet, leaving the rest untouched.
 *
 * @param filters - Current filter state
 * @param key - Facet to reset
 * @returns New filter object; the input is not mutated
 */
export function resetDeviceFilter(
  filters: DeviceFilters,
  key: DeviceFilterKey,
): DeviceFilters {
  return {
    ...filters,
    [key]: key === "search" ? "" : ALL_FILTER_VALUE,
  };
}
