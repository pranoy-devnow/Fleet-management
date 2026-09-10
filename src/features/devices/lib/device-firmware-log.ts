import type { FirmwareRelease } from "@/features/firmware/types";

import type { DeviceFirmwareLogEntry, WorldDevice } from "../types";
import { isNewerFirmware, parseFirmwareVersion } from "./compare-firmware";

const ALL_DEVICE_TYPES = "All device types";

/**
 * Builds the install log for a device from catalog releases at or below the
 * current firmware. Recalled packages are omitted. Newest first.
 *
 * @param device - Device whose history is needed
 * @param releases - Published firmware catalog
 */
export function buildDeviceFirmwareLog(
  device: Pick<WorldDevice, "firmware" | "model">,
  releases: readonly FirmwareRelease[],
): DeviceFirmwareLogEntry[] {
  const seen = new Set<string>();
  const entries: DeviceFirmwareLogEntry[] = [];

  for (const release of releases) {
    if (release.status === "recalled") continue;
    if (!targetsDeviceType(release, device.model)) continue;
    if (isNewerFirmware(release.version, device.firmware)) continue;
    if (seen.has(release.version)) continue;
    if (!parseFirmwareVersion(release.version)) continue;
    seen.add(release.version);
    entries.push({
      version: release.version,
      installedOn: release.date,
      notes: release.notes,
    });
  }

  return entries.sort((left, right) => {
    if (isNewerFirmware(left.version, right.version)) return -1;
    if (isNewerFirmware(right.version, left.version)) return 1;
    return 0;
  });
}

function targetsDeviceType(release: FirmwareRelease, model: string): boolean {
  return release.deviceType === model || release.deviceType === ALL_DEVICE_TYPES;
}
