import { listFirmwareReleases } from "@/features/firmware/repositories/firmware-repository";
import type { FirmwareRelease } from "@/features/firmware/types";

import { listWorldDevices } from "../repositories/device-repository";
import type { DeviceFirmwareLogEntry, FirmwareUpdateOffer, WorldDevice } from "../types";
import { applyDeviceFirmwareUpdate } from "./apply-device-update";
import { buildDeviceFirmwareLog } from "./device-firmware-log";

export type DeviceCatalogSnapshot = {
  devices: WorldDevice[];
  logs: Record<string, DeviceFirmwareLogEntry[]>;
};

/**
 * Live fleet plus per-device install logs so detail and the list stay aligned.
 * Resets on a full reload.
 *
 * @param initialDevices - Starting fleet
 * @param initialReleases - Catalog used to seed each device's log
 */
export function createDeviceCatalogStore(
  initialDevices: readonly WorldDevice[] = listWorldDevices(),
  initialReleases: readonly FirmwareRelease[] = listFirmwareReleases(),
) {
  let devices = initialDevices.map((device) => ({ ...device }));
  let logs: Record<string, DeviceFirmwareLogEntry[]> = Object.fromEntries(
    devices.map((device) => [device.id, buildDeviceFirmwareLog(device, initialReleases)]),
  );
  let cached: DeviceCatalogSnapshot = { devices, logs };
  const listeners = new Set<() => void>();

  function emit() {
    cached = { devices, logs };
    for (const listener of listeners) listener();
  }

  return {
    getSnapshot(): DeviceCatalogSnapshot {
      return cached;
    },

    /**
     * Subscribe to catalog changes. Returns an unsubscribe function.
     */
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Applies a finished OTA to one device.
     *
     * @returns The updated device, or null when the id is unknown
     */
    applyUpdate(
      deviceId: string,
      offer: FirmwareUpdateOffer,
      now: Date = new Date(),
    ): WorldDevice | null {
      const current = devices.find((device) => device.id === deviceId);
      if (!current) return null;

      const result = applyDeviceFirmwareUpdate(current, logs[deviceId] ?? [], offer, now);
      devices = devices.map((device) => (device.id === deviceId ? result.device : device));
      logs = { ...logs, [deviceId]: result.log };
      emit();
      return result.device;
    },
  };
}

export const deviceCatalogStore = createDeviceCatalogStore();
