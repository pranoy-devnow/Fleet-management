import type { DeviceCountry } from "../types";

/**
 * Narrows fleet countries by a free-text query.
 *
 * Matches the country and its region label, so typing "europe" surfaces every
 * European country rather than nothing.
 *
 * @param countries - Countries to search
 * @param query - Free text; blank or whitespace returns every country
 * @returns Matching countries in their original order
 */
export function searchDeviceCountries(
  countries: readonly DeviceCountry[],
  query: string,
): DeviceCountry[] {
  const term = query.trim().toLowerCase();
  if (term === "") return [...countries];

  return countries.filter(
    (entry) =>
      entry.country.toLowerCase().includes(term) ||
      entry.regionLabel.toLowerCase().includes(term),
  );
}
