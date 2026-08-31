/**
 * Lifecycle of a published firmware package.
 */
export type FirmwareReleaseStatus = "active" | "superseded" | "recalled";

/**
 * A published firmware release targeted at a model and region.
 */
export type FirmwareRelease = {
  version: string;
  date: string;
  region: string;
  model: string;
  status: FirmwareReleaseStatus;
  devices: number;
  notes: string;
};

export type FirmwareFilters = {
  region: string;
  model: string;
  status: string;
  search: string;
};

export type DeployType = "immediate" | "scheduled" | "maintenance";
