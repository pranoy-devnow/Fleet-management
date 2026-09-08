import type { AssignedDevice } from "../types";

/**
 * Outcome of removing a device. A serial that is not on the list is expected
 * user error — a stale tab, a re-submitted confirmation — not a bug.
 */
export type RemoveDeviceResult =
  | { ok: true; devices: AssignedDevice[]; device: AssignedDevice }
  | { ok: false; code: "not_found" };

/**
 * Removes one device from a list by serial.
 *
 * @param devices - Devices currently assigned to the biomed
 * @param deviceId - Serial of the device to remove
 * @returns The remaining devices and the one removed, or a not-found failure
 */
export function removeDevice(
  devices: readonly AssignedDevice[],
  deviceId: string,
): RemoveDeviceResult {
  const device = devices.find((item) => item.id === deviceId);
  if (!device) return { ok: false, code: "not_found" };

  return { ok: true, devices: devices.filter((item) => item !== device), device };
}
