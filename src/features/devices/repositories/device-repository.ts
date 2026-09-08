import { ASSIGNED_DEVICES, NEWLY_REGISTERED_DEVICE } from "../data/assigned-devices";
import { WORLD_DEVICES } from "../data/world-devices";
import { formatRegionLabel } from "../lib/format-region";
import type { AssignedDevice, DeviceCountry, WorldDevice } from "../types";

/**
 * Returns a copy of the global fleet. Callers must not mutate the result.
 */
export function listWorldDevices(): WorldDevice[] {
  return WORLD_DEVICES.map((device) => ({ ...device }));
}

/**
 * Looks up a fleet device by serial ID.
 *
 * @throws never — returns undefined when the ID is unknown
 */
export function getWorldDeviceById(id: string): WorldDevice | undefined {
  const device = WORLD_DEVICES.find((item) => item.id === id);
  return device ? { ...device } : undefined;
}

/**
 * Every device the prototype biomed account (Dr. Rossi / Charité) owns: the
 * serial from first-time setup plus the rest of their fleet.
 *
 * This seeds `assignedDeviceStore`, which every biomed screen reads. Nothing
 * queries these fixtures directly, so adding and removing devices cannot leave
 * two screens disagreeing about what exists.
 */
export function listBiomedDevices(): AssignedDevice[] {
  return [NEWLY_REGISTERED_DEVICE, ...ASSIGNED_DEVICES].map((device) => ({ ...device }));
}

/**
 * Unique hospital names from the global fleet, sorted A–Z.
 */
export function listHospitals(): string[] {
  return [...new Set(WORLD_DEVICES.map((device) => device.hospital))].sort();
}

/**
 * Countries the fleet operates in, for the device registration location picker.
 *
 * Sorted A–Z because the picker is scanned by name; its search covers people
 * who think in regions instead.
 *
 * @returns One entry per country, with its region label
 */
export function listDeviceCountries(): DeviceCountry[] {
  const byCountry = new Map<string, DeviceCountry>();

  for (const device of WORLD_DEVICES) {
    if (byCountry.has(device.country)) continue;
    byCountry.set(device.country, {
      country: device.country,
      regionLabel: formatRegionLabel(device.region),
    });
  }

  return [...byCountry.values()].sort((a, b) => a.country.localeCompare(b.country));
}
