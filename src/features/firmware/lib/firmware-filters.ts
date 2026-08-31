import { ALL_FILTER_VALUE } from "@/lib/filters";

import type { FirmwareFilters } from "../types";

/** Facets firmware history can be narrowed by. */
export type FirmwareFilterKey = keyof FirmwareFilters;

/**
 * Filters with nothing narrowed.
 */
export function emptyFirmwareFilters(): FirmwareFilters {
  return {
    region: ALL_FILTER_VALUE,
    model: ALL_FILTER_VALUE,
    status: ALL_FILTER_VALUE,
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
export function resetFirmwareFilter(
  filters: FirmwareFilters,
  key: FirmwareFilterKey,
): FirmwareFilters {
  return {
    ...filters,
    [key]: key === "search" ? "" : ALL_FILTER_VALUE,
  };
}
