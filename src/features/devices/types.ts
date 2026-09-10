/**
 * Device status values used across the fleet portal.
 * Amber = pending update, green = current, red = last update failed.
 */
export type DeviceStatus = "needs-update" | "updated" | "failed";

/**
 * A fleet device used on the internal device table.
 */
export type WorldDevice = {
  id: string;
  city: string;
  country: string;
  region: string;
  status: DeviceStatus;
  hospital: string;
  firmware: string;
  model: string;
};

/**
 * Filter values for the internal device table.
 */
export type DeviceFilters = {
  status: string;
  search: string;
};

/** One past or current firmware install on a single device. */
export type DeviceFirmwareLogEntry = {
  version: string;
  installedOn: string;
  notes: string;
  uploadedBy: string;
};

/** The firmware a device should receive next. */
export type FirmwareUpdateOffer = {
  version: string;
  notes: string;
  uploadedBy: string;
};
