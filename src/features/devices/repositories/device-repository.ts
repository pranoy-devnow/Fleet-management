import { WORLD_DEVICES } from "../data/world-devices";
import type { WorldDevice } from "../types";

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
