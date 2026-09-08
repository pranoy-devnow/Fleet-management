import { BIOMED_HOSPITAL, NEW_DEVICE_FIRMWARE } from "../constants";
import type { AddDeviceInput } from "../schemas";
import type { AssignedDevice } from "../types";

/**
 * Builds an assigned device from what the add-device form collects.
 *
 * Serials are printed on the unit in uppercase but typed by hand, so they are
 * normalised here — every later comparison can then be a plain equality check.
 *
 * @param input - Validated form fields
 * @returns A device owned by the prototype biomed's hospital, flagged as new
 */
export function createAssignedDevice(input: AddDeviceInput): AssignedDevice {
  return {
    id: input.serial.trim().toUpperCase(),
    hospital: BIOMED_HOSPITAL,
    ward: input.ward.trim(),
    status: "needs-update",
    firmware: NEW_DEVICE_FIRMWARE,
    isNew: true,
    country: input.country,
    model: input.model,
  };
}
