"use client";

import { useCallback, useSyncExternalStore } from "react";

import { deviceCatalogStore } from "@/features/devices/lib/device-catalog-store";
import type { DeviceFirmwareLogEntry, FirmwareUpdateOffer, WorldDevice } from "@/features/devices/types";

/**
 * Live fleet and install logs shared by the device list and device detail.
 */
export function useDeviceCatalog(): {
  devices: WorldDevice[];
  logs: Record<string, DeviceFirmwareLogEntry[]>;
  applyUpdate: (deviceId: string, offer: FirmwareUpdateOffer) => WorldDevice | null;
} {
  const snapshot = useSyncExternalStore(
    deviceCatalogStore.subscribe,
    deviceCatalogStore.getSnapshot,
    deviceCatalogStore.getSnapshot,
  );
  const applyUpdate = useCallback(
    (deviceId: string, offer: FirmwareUpdateOffer) => deviceCatalogStore.applyUpdate(deviceId, offer),
    [],
  );

  return { devices: snapshot.devices, logs: snapshot.logs, applyUpdate };
}
