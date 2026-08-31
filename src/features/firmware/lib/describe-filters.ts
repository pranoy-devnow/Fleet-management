import { ALL_FILTER_VALUE } from "@/lib/filters";

import { FIRMWARE_MODEL_OPTIONS, FIRMWARE_REGION_OPTIONS } from "../constants";
import type { FirmwareFilters } from "../types";
import type { FirmwareFilterKey } from "./firmware-filters";

/**
 * An active firmware filter resolved to the labels a chip should show.
 */
export type DescribedFirmwareFilter = {
  key: FirmwareFilterKey;
  facetLabel: string;
  valueLabel: string;
};

const FACET_LABELS: Record<FirmwareFilterKey, string> = {
  region: "Region",
  model: "Model",
  status: "Status",
  search: "Search",
};

/**
 * Describes every active filter for the chip row.
 *
 * Status is excluded because the always-visible segmented control already shows
 * it, and one filter should have one UI path.
 *
 * @param filters - Current filter state
 * @returns One entry per narrowed facet, in chip display order
 */
export function describeFirmwareFilters(
  filters: FirmwareFilters,
): DescribedFirmwareFilter[] {
  const described: DescribedFirmwareFilter[] = [];

  if (filters.region !== ALL_FILTER_VALUE) {
    described.push(describe("region", labelFor(FIRMWARE_REGION_OPTIONS, filters.region)));
  }
  if (filters.model !== ALL_FILTER_VALUE) {
    described.push(describe("model", labelFor(FIRMWARE_MODEL_OPTIONS, filters.model)));
  }

  const search = filters.search.trim();
  if (search !== "") {
    described.push(describe("search", `"${search}"`));
  }

  return described;
}

function describe(key: FirmwareFilterKey, valueLabel: string): DescribedFirmwareFilter {
  return { key, facetLabel: FACET_LABELS[key], valueLabel };
}

/**
 * Resolves a stored filter value to its option label, falling back to the raw
 * value so a value missing from the options list still reads sensibly.
 */
function labelFor(
  options: ReadonlyArray<readonly [string, string]>,
  value: string,
): string {
  return options.find(([optionValue]) => optionValue === value)?.[1] ?? value;
}
