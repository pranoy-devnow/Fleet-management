import type { FirmwareRelease } from "../types";

/**
 * Finds a release by version and device type. Versions are not unique alone.
 *
 * @param releases - Published firmware packages
 * @param version - Version label, e.g. `v2.4.0`
 * @param deviceType - Device type stored on the release
 * @returns The matching release, or undefined when none exists
 */
export function findFirmwareRelease(
  releases: readonly FirmwareRelease[],
  version: string,
  deviceType: string,
): FirmwareRelease | undefined {
  return releases.find(
    (release) => release.version === version && release.deviceType === deviceType,
  );
}
