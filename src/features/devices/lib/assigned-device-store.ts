import { listBiomedDevices } from "../repositories/device-repository";
import type { AddDeviceInput } from "../schemas";
import type { AssignedDevice } from "../types";
import { addDevice, type AddDeviceResult } from "./add-device";
import { removeDevice, type RemoveDeviceResult } from "./remove-device";

/**
 * Shared list of the devices assigned to the signed-in biomed, so every biomed
 * screen — both device lists, the header search, and the two device pages —
 * agrees on what exists. There is no server: this lives in the module and
 * resets on a full reload.
 *
 * @param initial - Devices to start from
 */
export function createAssignedDeviceStore(
  initial: readonly AssignedDevice[] = listBiomedDevices(),
) {
  let devices = [...initial];
  const listeners = new Set<() => void>();

  function emit() {
    for (const listener of listeners) listener();
  }

  return {
    /**
     * Current devices, newest first. Callers must not mutate the array.
     */
    getSnapshot(): AssignedDevice[] {
      return devices;
    },

    /**
     * Subscribe to list changes. Returns an unsubscribe function.
     */
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Registers one more device and notifies subscribers on success.
     *
     * @param input - Validated form fields
     * @returns The added device, or a duplicate-serial failure that leaves the list untouched
     */
    add(input: AddDeviceInput): AddDeviceResult {
      const result = addDevice(devices, input);
      if (!result.ok) return result;
      devices = result.devices;
      emit();
      return result;
    },

    /**
     * Removes one device and notifies subscribers on success.
     *
     * @param deviceId - Serial of the device to remove
     * @returns The removed device, or a not-found failure that leaves the list untouched
     */
    remove(deviceId: string): RemoveDeviceResult {
      const result = removeDevice(devices, deviceId);
      if (!result.ok) return result;
      devices = result.devices;
      emit();
      return result;
    },
  };
}

export const assignedDeviceStore = createAssignedDeviceStore();
