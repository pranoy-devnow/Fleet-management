import { ALL_FILTER_VALUE as ALL } from "@/lib/filters";

import type { DeviceFilters, WorldDevice } from "../types";

/**
 * Returns devices matching every active filter. `"all"` and an empty search
 * are treated as no-ops so the default view is the full fleet.
 *
 * @param devices - Fleet devices to filter
 * @param filters - Region, status, model, hospital, and free-text search
 * @returns Devices that satisfy every non-default filter
 */
export function filterWorldDevices(
  devices: WorldDevice[],
  filters: DeviceFilters,
): WorldDevice[] {
  const search = filters.search.trim().toLowerCase();

  return devices.filter((device) => {
    if (filters.region !== ALL && device.region !== filters.region) return false;
    if (filters.status !== ALL && device.status !== filters.status) return false;
    if (filters.model !== ALL && device.model !== filters.model) return false;
    if (filters.hospital !== ALL && !matchesHospital(device, filters.hospital)) {
      return false;
    }
    if (search && !matchesSearch(device, search)) return false;
    return true;
  });
}

/**
 * True when any filter is more specific than the default "show all" state.
 */
export function hasActiveDeviceFilters(filters: DeviceFilters): boolean {
  return (
    filters.region !== ALL ||
    filters.status !== ALL ||
    filters.model !== ALL ||
    filters.hospital !== ALL ||
    filters.search.trim() !== ""
  );
}

function matchesHospital(device: WorldDevice, hospital: string): boolean {
  return device.hospital.toLowerCase().includes(hospital.toLowerCase());
}

function matchesSearch(device: WorldDevice, search: string): boolean {
  return (
    device.id.toLowerCase().includes(search) ||
    device.city.toLowerCase().includes(search) ||
    device.hospital.toLowerCase().includes(search)
  );
}
