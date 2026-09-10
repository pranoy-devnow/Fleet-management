/**
 * Lifecycle of a published firmware package.
 */
export type FirmwareReleaseStatus = "active" | "superseded" | "recalled";

/**
 * A published firmware release targeted at a device type and region.
 */
export type FirmwareRelease = {
  version: string;
  date: string;
  region: string;
  deviceType: string;
  status: FirmwareReleaseStatus;
  devices: number;
  notes: string;
  /** Display name of the staff member who published this release. */
  uploadedBy: string;
};
