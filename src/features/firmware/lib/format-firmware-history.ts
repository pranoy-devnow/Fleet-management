import type { FirmwareRelease } from "../types";

/** Prefix before the staff name on a history row. */
export const UPLOADED_BY_LABEL = "Uploaded by";

/**
 * Secondary line for a firmware history row: release notes and who uploaded it.
 *
 * @param release - Published firmware package
 */
export function formatFirmwareHistorySubtitle(release: FirmwareRelease): string {
  return `${release.notes} · ${UPLOADED_BY_LABEL}: ${release.uploadedBy}`;
}
