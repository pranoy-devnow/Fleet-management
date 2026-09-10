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
};

export type DeployType = "immediate" | "scheduled";
