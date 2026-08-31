import { ALL_FILTER_VALUE } from "@/lib/filters";

import type { DeviceFilters, WorldDevice } from "../types";
import { DEVICE_FACET_LABELS } from "./describe-filters";
import { resetDeviceFilter, type DeviceFilterKey } from "./device-filters";
import { filterWorldDevices } from "./filter-devices";

/**
 * A single filter whose removal would reveal devices again.
 */
export type FilterRelaxation = {
  key: DeviceFilterKey;
  facetLabel: string;
  /** Devices visible once this filter is cleared. Always greater than zero. */
  count: number;
};

/**
 * Facets in tie-break order. Deliberately incidental first and search last: a
 * typed query is the most intentional filter, so it is the last one we suggest
 * giving up.
 */
const RELAXATION_ORDER: readonly DeviceFilterKey[] = [
  "region",
  "model",
  "hospital",
  "status",
  "search",
];

/**
 * Finds the one filter whose removal reveals the most devices, for the empty
 * state to offer as a way out. Intended for use when the current filters match
 * nothing.
 *
 * @param devices - Unfiltered fleet
 * @param filters - Filter state that produced the empty result
 * @returns The most productive single removal, or null when no single removal
 *   helps (nothing is active, or every facet must be cleared)
 */
export function suggestFilterRelaxation(
  devices: WorldDevice[],
  filters: DeviceFilters,
): FilterRelaxation | null {
  let best: FilterRelaxation | null = null;

  for (const key of RELAXATION_ORDER) {
    if (!isFilterActive(filters, key)) continue;

    const count = filterWorldDevices(devices, resetDeviceFilter(filters, key)).length;
    if (count === 0) continue;
    if (best === null || count > best.count) {
      best = { key, facetLabel: DEVICE_FACET_LABELS[key], count };
    }
  }

  return best;
}

function isFilterActive(filters: DeviceFilters, key: DeviceFilterKey): boolean {
  if (key === "search") return filters.search.trim() !== "";
  return filters[key] !== ALL_FILTER_VALUE;
}
