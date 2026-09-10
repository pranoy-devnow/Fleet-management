import type { FirmwareRelease } from "@/features/firmware/types";

import type { FirmwareUpdateOffer, WorldDevice } from "../types";
import { isNewerFirmware } from "./compare-firmware";

const ALL_DEVICE_TYPES = "All device types";

/**
 * Picks the newest active release for this device type that is newer than the
 * firmware already installed. Recalled packages are never offered.
 *
 * @param device - Device with a current firmware and model
 * @param releases - Published firmware catalog
 * @returns Version and notes to show on the update card, or null when current
 */
export function recommendedFirmwareUpdate(
  device: Pick<WorldDevice, "firmware" | "model">,
  releases: readonly FirmwareRelease[],
): FirmwareUpdateOffer | null {
  const matches = releases.filter(
    (release) =>
      release.status === "active" &&
      targetsDeviceType(release, device.model) &&
      isNewerFirmware(release.version, device.firmware),
  );

  const newest = matches.reduce<FirmwareRelease | null>((best, release) => {
    if (!best || isNewerFirmware(release.version, best.version)) return release;
    return best;
  }, null);

  if (!newest) return null;
  return { version: newest.version, notes: newest.notes };
}

function targetsDeviceType(release: FirmwareRelease, model: string): boolean {
  return release.deviceType === model || release.deviceType === ALL_DEVICE_TYPES;
}
