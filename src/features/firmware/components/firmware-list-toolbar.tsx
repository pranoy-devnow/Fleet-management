"use client";

import { FIRMWARE_MODEL_OPTIONS, FIRMWARE_REGION_OPTIONS } from "@/features/firmware/constants";
import { describeFirmwareFilters } from "@/features/firmware/lib/describe-filters";
import {
  emptyFirmwareFilters,
  resetFirmwareFilter,
  type FirmwareFilterKey,
} from "@/features/firmware/lib/firmware-filters";
import type { FirmwareFilters } from "@/features/firmware/types";
import { ActiveFilterChips } from "@/features/shell/active-filter-chips";
import { FilterMenu, type FilterGroup } from "@/features/shell/filter-menu";
import { SearchField } from "@/features/shell/search-field";
import { SegmentedControl } from "@/features/shell/segmented-control";
import { ALL_FILTER_VALUE } from "@/lib/filters";

/**
 * Lifecycle is the primary axis for firmware, so it stays visible while region
 * and model collapse into the filter menu.
 */
const STATUS_SEGMENTS = [
  ["all", "All"],
  ["active", "Active"],
  ["superseded", "Superseded"],
  ["recalled", "Recalled"],
] as const;

/** Facets offered inside the filter menu, in display order. */
type MenuFacet = "region" | "model";

/**
 * Single-row filter bar for firmware history.
 *
 * @param filters - Current filter state
 * @param onFiltersChange - Receives the full next filter state
 */
export function FirmwareListToolbar({
  filters,
  onFiltersChange,
}: {
  filters: FirmwareFilters;
  onFiltersChange: (next: FirmwareFilters) => void;
}) {
  const groups: Array<FilterGroup<MenuFacet>> = [
    { key: "region", label: "Region", value: filters.region, options: FIRMWARE_REGION_OPTIONS },
    { key: "model", label: "Model", value: filters.model, options: FIRMWARE_MODEL_OPTIONS },
  ];

  const menuActiveCount = groups.filter((group) => group.value !== ALL_FILTER_VALUE).length;

  function update(partial: Partial<FirmwareFilters>) {
    onFiltersChange({ ...filters, ...partial });
  }

  return (
    <div className="mb-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchField
          value={filters.search}
          onChange={(search) => update({ search })}
          placeholder="Search version or notes"
        />
        <SegmentedControl
          value={filters.status}
          onChange={(status) => update({ status })}
          options={STATUS_SEGMENTS}
          label="Filter by release status"
        />
        <FilterMenu
          groups={groups}
          activeCount={menuActiveCount}
          onChange={(key, value) => update({ [key]: value })}
        />
      </div>
      <ActiveFilterChips
        filters={describeFirmwareFilters(filters)}
        onRemove={(key: FirmwareFilterKey) => onFiltersChange(resetFirmwareFilter(filters, key))}
        onClearAll={() => onFiltersChange(emptyFirmwareFilters())}
      />
    </div>
  );
}
