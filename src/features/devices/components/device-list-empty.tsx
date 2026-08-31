"use client";

import type { DeviceFilterKey } from "@/features/devices/lib/device-filters";
import { suggestFilterRelaxation } from "@/features/devices/lib/suggest-filter-relaxation";
import type { DeviceFilters, WorldDevice } from "@/features/devices/types";

/**
 * Empty state that names the way out instead of leaving a blank panel: it
 * points at the single filter whose removal reveals the most devices.
 *
 * @param devices - Unfiltered fleet, used to work out what widening would reveal
 * @param filters - Filter state that produced the empty result
 * @param onRelax - Clears the suggested facet
 * @param onClearAll - Clears every filter, offered when no single removal helps
 */
export function DeviceListEmpty({
  devices,
  filters,
  onRelax,
  onClearAll,
}: {
  devices: WorldDevice[];
  filters: DeviceFilters;
  onRelax: (key: DeviceFilterKey) => void;
  onClearAll: () => void;
}) {
  const suggestion = suggestFilterRelaxation(devices, filters);

  return (
    <div className="px-5 py-14 text-center">
      <p className="text-[15px] font-semibold text-foreground">No devices match</p>
      {suggestion ? (
        <>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Removing the {suggestion.facetLabel.toLowerCase()} filter would show{" "}
            {deviceCount(suggestion.count)}.
          </p>
          <button
            type="button"
            onClick={() => onRelax(suggestion.key)}
            className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Remove {suggestion.facetLabel.toLowerCase()} filter
          </button>
        </>
      ) : (
        <>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Every device is excluded by the current filters.
          </p>
          <button
            type="button"
            onClick={onClearAll}
            className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Clear all filters
          </button>
        </>
      )}
    </div>
  );
}

function deviceCount(count: number): string {
  return `${count} device${count === 1 ? "" : "s"}`;
}
