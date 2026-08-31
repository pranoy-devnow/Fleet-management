"use client";

import { MODEL_OPTIONS, REGION_OPTIONS } from "@/features/devices/constants";
import { describeDeviceFilters } from "@/features/devices/lib/describe-filters";
import {
  emptyDeviceFilters,
  resetDeviceFilter,
  type DeviceFilterKey,
} from "@/features/devices/lib/device-filters";
import type { DeviceFilters, DeviceSortKey } from "@/features/devices/types";
import { ActiveFilterChips } from "@/features/shell/active-filter-chips";
import { FilterMenu, type FilterGroup } from "@/features/shell/filter-menu";
import { SearchField } from "@/features/shell/search-field";
import { SegmentedControl } from "@/features/shell/segmented-control";
import { SortMenu } from "@/features/shell/sort-menu";
import { ALL_FILTER_VALUE } from "@/lib/filters";

/**
 * Status is the primary triage axis, so it stays visible while every other
 * facet collapses into the filter menu.
 */
const STATUS_SEGMENTS = [
  ["all", "All"],
  ["updated", "Updated"],
  ["needs-update", "Needs update"],
  ["failed", "Failed"],
] as const;

/** Facets offered inside the filter menu. */
type MenuFacet = "region" | "model" | "hospital";

/**
 * Sort controls, passed through to the toolbar so the list keeps ownership of
 * the sorted rows.
 */
export type DeviceSortControls = {
  key: DeviceSortKey;
  ascending: boolean;
  options: ReadonlyArray<readonly [DeviceSortKey, string]>;
  onKeyChange: (key: DeviceSortKey) => void;
  onToggleDirection: () => void;
};

/**
 * Single-row filter bar for the fleet device list: search, status segments,
 * collapsed secondary facets, and sort, with active filters named underneath.
 *
 * @param filters - Current filter state
 * @param onFiltersChange - Receives the full next filter state
 * @param hospitals - `[value, label]` pairs for the hospital facet, including the "all" entry
 * @param sort - Sort key, direction, and their change handlers
 */
export function DeviceListToolbar({
  filters,
  onFiltersChange,
  hospitals,
  sort,
}: {
  filters: DeviceFilters;
  onFiltersChange: (next: DeviceFilters) => void;
  hospitals: ReadonlyArray<readonly [string, string]>;
  sort: DeviceSortControls;
}) {
  const groups: Array<FilterGroup<MenuFacet>> = [
    { key: "region", label: "Region", value: filters.region, options: REGION_OPTIONS },
    { key: "model", label: "Model", value: filters.model, options: MODEL_OPTIONS },
    { key: "hospital", label: "Hospital", value: filters.hospital, options: hospitals, scroll: true },
  ];

  const menuActiveCount = groups.filter((group) => group.value !== ALL_FILTER_VALUE).length;

  function update(partial: Partial<DeviceFilters>) {
    onFiltersChange({ ...filters, ...partial });
  }

  return (
    <div className="mb-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchField
          value={filters.search}
          onChange={(search) => update({ search })}
          placeholder="Search ID, city, or hospital"
        />
        <SegmentedControl
          value={filters.status}
          onChange={(status) => update({ status })}
          options={STATUS_SEGMENTS}
          label="Filter by status"
        />
        <FilterMenu
          groups={groups}
          activeCount={menuActiveCount}
          onChange={(key, value) => update({ [key]: value })}
        />
        <SortMenu
          sortKey={sort.key}
          sortAsc={sort.ascending}
          options={sort.options}
          onChange={sort.onKeyChange}
          onToggleDirection={sort.onToggleDirection}
        />
      </div>
      <ActiveFilterChips
        filters={describeDeviceFilters(filters)}
        onRemove={(key: DeviceFilterKey) => onFiltersChange(resetDeviceFilter(filters, key))}
        onClearAll={() => onFiltersChange(emptyDeviceFilters())}
      />
    </div>
  );
}
