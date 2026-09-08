import type { AddDeviceInput } from "../schemas";
import type { AssignedDevice } from "../types";
import { createAssignedDevice } from "./create-assigned-device";

/**
 * Outcome of adding a device. A duplicate serial is expected user error, not a
 * bug, so it comes back as a value the form can render.
 */
export type AddDeviceResult =
  | { ok: true; devices: AssignedDevice[]; device: AssignedDevice }
  | { ok: false; code: "duplicate_serial" };

/**
 * Adds one device to a list, rejecting a serial that is already registered.
 *
 * @param devices - Devices currently assigned to the biomed
 * @param input - Validated form fields
 * @returns The new list with the device first, or a duplicate-serial failure
 */
export function addDevice(
  devices: readonly AssignedDevice[],
  input: AddDeviceInput,
): AddDeviceResult {
  const device = createAssignedDevice(input);

  if (devices.some((existing) => existing.id.toUpperCase() === device.id)) {
    return { ok: false, code: "duplicate_serial" };
  }

  return { ok: true, devices: [device, ...devices], device };
}
