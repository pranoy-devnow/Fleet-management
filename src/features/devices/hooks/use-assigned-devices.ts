"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { AddDeviceResult } from "../lib/add-device";
import { assignedDeviceStore } from "../lib/assigned-device-store";
import type { RemoveDeviceResult } from "../lib/remove-device";
import type { AddDeviceInput } from "../schemas";
import type { AssignedDevice } from "../types";

/**
 * Live list of the signed-in biomed's devices, shared by both device lists,
 * both device pages, and the header search.
 */
export function useAssignedDevices(): {
  devices: AssignedDevice[];
  add: (input: AddDeviceInput) => AddDeviceResult;
  remove: (deviceId: string) => RemoveDeviceResult;
} {
  const devices = useSyncExternalStore(
    assignedDeviceStore.subscribe,
    assignedDeviceStore.getSnapshot,
    assignedDeviceStore.getSnapshot,
  );
  const add = useCallback((input: AddDeviceInput) => assignedDeviceStore.add(input), []);
  const remove = useCallback((deviceId: string) => assignedDeviceStore.remove(deviceId), []);

  return { devices, add, remove };
}
