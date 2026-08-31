import { FIRMWARE_RELEASES } from "../data/releases";
import type { FirmwareRelease } from "../types";

/**
 * Returns a copy of every published firmware release.
 */
export function listFirmwareReleases(): FirmwareRelease[] {
  return FIRMWARE_RELEASES.map((release) => ({ ...release }));
}

/**
 * Finds a release by version + model. Version IDs are not unique across models.
 *
 * @returns The matching release, or undefined when none exists
 */
export function getFirmwareRelease(
  version: string,
  model: string,
): FirmwareRelease | undefined {
  const release = FIRMWARE_RELEASES.find(
    (item) => item.version === version && item.model === model,
  );
  return release ? { ...release } : undefined;
}

/**
 * Count of releases currently marked active.
 */
export function countActiveReleases(): number {
  return FIRMWARE_RELEASES.filter((release) => release.status === "active").length;
}
