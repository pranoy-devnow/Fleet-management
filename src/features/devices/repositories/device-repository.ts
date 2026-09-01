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
 * Devices assigned to the prototype biomed account (Dr. Rossi / Charité).
 */
export function listAssignedDevices(): AssignedDevice[] {
  return ASSIGNED_DEVICES.map((device) => ({ ...device }));
}

/**
 * Assigned devices plus the just-registered serial used after first-time setup.
 */
export function listPostRegistrationDevices(): AssignedDevice[] {
  return [NEWLY_REGISTERED_DEVICE, ...ASSIGNED_DEVICES.slice(0, 2)].map((device) => ({
    ...device,
  }));
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

/**
 * Looks up an assigned device, falling back to the newly registered prototype device.
 */
export function getAssignedDeviceById(id: string): AssignedDevice | undefined {
  const fromAssigned = ASSIGNED_DEVICES.find((item) => item.id === id);
  if (fromAssigned) return { ...fromAssigned };
  if (id === NEWLY_REGISTERED_DEVICE.id) return { ...NEWLY_REGISTERED_DEVICE };
  return undefined;
}
