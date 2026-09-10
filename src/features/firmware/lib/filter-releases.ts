import type { FirmwareRelease } from "../types";

/**
 * Returns releases whose version, notes, device type, or region contain the
 * search text. Blank or whitespace-only search returns every release.
 *
 * @param releases - Published firmware packages
 * @param search - Free-text query
 */
export function filterFirmwareReleases(
  releases: FirmwareRelease[],
  search: string,
): FirmwareRelease[] {
  const query = search.trim().toLowerCase();
  if (!query) return releases;
  return releases.filter((release) => matchesSearch(release, query));
}

/**
 * True when the history search box is narrowing the list.
 *
 * @param search - Current query
 */
export function hasActiveFirmwareSearch(search: string): boolean {
  return search.trim() !== "";
}

function matchesSearch(release: FirmwareRelease, search: string): boolean {
  return (
    release.version.toLowerCase().includes(search) ||
    release.notes.toLowerCase().includes(search) ||
    release.deviceType.toLowerCase().includes(search) ||
    release.region.toLowerCase().includes(search)
  );
}
