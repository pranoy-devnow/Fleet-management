"use client";

import { useCallback, useSyncExternalStore } from "react";

import { getAccountUser } from "@/features/account/lib/current-user";
import { firmwareReleaseStore } from "@/features/firmware/lib/firmware-release-store";
import type { PublishFirmwareInput } from "@/features/firmware/schemas";
import type { FirmwareRelease } from "@/features/firmware/types";

/**
 * Live firmware catalog shared by publish, history, and detail.
 */
export function useFirmwareReleases(): {
  releases: FirmwareRelease[];
  publish: (input: PublishFirmwareInput) => FirmwareRelease;
} {
  const releases = useSyncExternalStore(
    firmwareReleaseStore.subscribe,
    firmwareReleaseStore.getSnapshot,
    firmwareReleaseStore.getSnapshot,
  );
  const publish = useCallback(
    (input: PublishFirmwareInput) =>
      firmwareReleaseStore.publish(input, getAccountUser().name),
    [],
  );

  return { releases, publish };
}
