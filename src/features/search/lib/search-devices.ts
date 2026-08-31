import { filterWorldDevices } from "@/features/devices/lib/filter-devices";
import type { AssignedDevice, WorldDevice } from "@/features/devices/types";

/**
 * Finds fleet devices by ID, city, or hospital. Empty query returns no rows
 * so the header popover stays quiet until the user types.
 *
 * @param devices - World fleet to search
 * @param query - Free-text query
 */
export function searchWorldDevices(devices: WorldDevice[], query: string): WorldDevice[] {
  const search = query.trim();
  if (!search) return [];

  return filterWorldDevices(devices, {
    region: "all",
    status: "all",
    model: "all",
    hospital: "all",
    search,
  });
}

/**
 * Finds assigned devices by serial, hospital, or ward.
 *
 * @param devices - Biomed-assigned devices
 * @param query - Free-text query
 */
export function searchAssignedDevices(
  devices: AssignedDevice[],
  query: string,
): AssignedDevice[] {
  const search = query.trim().toLowerCase();
  if (!search) return [];

  return devices.filter((device) => {
    return (
      device.id.toLowerCase().includes(search) ||
      device.hospital.toLowerCase().includes(search) ||
      device.ward.toLowerCase().includes(search)
    );
  });
}
