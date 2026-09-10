import type { FirmwareRelease } from "../types";

/**
 * Secondary line for a firmware history row: device type and region first.
 *
 * @param release - Published firmware package
 */
export function formatFirmwareHistorySubtitle(release: FirmwareRelease): string {
  return `${release.deviceType} · ${release.region} · ${release.date} · ${release.notes}`;
}
