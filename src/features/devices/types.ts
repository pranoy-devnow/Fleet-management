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
