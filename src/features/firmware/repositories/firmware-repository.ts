import { FIRMWARE_RELEASES } from "../data/releases";
import type { FirmwareRelease } from "../types";

/**
 * Returns a copy of the seed catalog. Live publish/history reads go through
 * `firmwareReleaseStore` so a new release is visible without a reload.
 */
export function listFirmwareReleases(): FirmwareRelease[] {
  return FIRMWARE_RELEASES.map((release) => ({ ...release }));
}
