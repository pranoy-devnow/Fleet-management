import type { FirmwareFilters, FirmwareRelease } from "../types";

const ALL = "all";

/**
 * Filters firmware releases by region, model, status, and version/notes search.
 */
export function filterFirmwareReleases(
  releases: FirmwareRelease[],
  filters: FirmwareFilters,
): FirmwareRelease[] {
  const search = filters.search.trim().toLowerCase();

  return releases.filter((release) => {
    if (filters.region !== ALL && release.region !== filters.region) return false;
    if (filters.model !== ALL && release.model !== filters.model) return false;
    if (filters.status !== ALL && release.status !== filters.status) return false;
    if (search && !matchesSearch(release, search)) return false;
    return true;
  });
}

/**
 * True when any firmware history filter is active.
 */
export function hasActiveFirmwareFilters(filters: FirmwareFilters): boolean {
  return (
    filters.region !== ALL ||
    filters.model !== ALL ||
    filters.status !== ALL ||
    filters.search.trim() !== ""
  );
}

function matchesSearch(release: FirmwareRelease, search: string): boolean {
  return (
    release.version.toLowerCase().includes(search) ||
    release.notes.toLowerCase().includes(search)
  );
}
