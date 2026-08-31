import type { DeviceSortKey, WorldDevice } from "../types";

/**
 * Sorts devices by a public field. Sort is locale-aware and stable for ties.
 *
 * @param devices - Devices to sort (not mutated)
 * @param key - Field to compare
 * @param ascending - When false, reverses the comparison
 */
export function sortWorldDevices(
  devices: WorldDevice[],
  key: DeviceSortKey,
  ascending: boolean,
): WorldDevice[] {
  return [...devices].sort((left, right) => {
    const comparison = left[key].localeCompare(right[key]);
    return ascending ? comparison : -comparison;
  });
}
