/**
 * Device status values used across the fleet portal.
 * Amber = pending update, green = current, red = last update failed.
 */
export type DeviceStatus = "needs-update" | "updated" | "failed";

/**
 * A device assigned to a hospital biomed, shown in hospital-staff lists.
 */
export type AssignedDevice = {
  id: string;
  hospital: string;
  ward: string;
  status: DeviceStatus;
  firmware: string;
  isNew?: boolean;
  /** Country the device is installed in. Only set for devices added in-app. */
  country?: string;
  /** Pump model. Only set for devices added in-app; older fixtures predate it. */
  model?: string;
};

/**
 * A geo-located fleet device used on maps and the internal device table.
 */
export type WorldDevice = {
  id: string;
  city: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  status: DeviceStatus;
  hospital: string;
  firmware: string;
  model: string;
};

/**
 * A country the fleet operates in. Used as the location a biomed picks when
 * registering a device, before naming their hospital.
 */
export type DeviceCountry = {
  country: string;
  /** Display label for the sales region, e.g. "North America". */
  regionLabel: string;
};

/**
 * Filter values for the global fleet map and device table.
 */
export type DeviceFilters = {
  region: string;
  status: string;
  model: string;
  hospital: string;
  search: string;
};

export type DeviceSortKey = "id" | "city" | "status" | "firmware";
