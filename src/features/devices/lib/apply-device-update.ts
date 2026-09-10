import type { DeviceFirmwareLogEntry, FirmwareUpdateOffer, WorldDevice } from "../types";

/**
 * Marks a device as running the offered firmware and prepends a log row.
 *
 * @param device - Device to update
 * @param log - Existing install history
 * @param offer - Version and notes that were installed
 * @param now - Clock for the install date; inject in tests
 * @returns New device and log; inputs are not mutated
 */
export function applyDeviceFirmwareUpdate(
  device: WorldDevice,
  log: readonly DeviceFirmwareLogEntry[],
  offer: FirmwareUpdateOffer,
  now: Date,
): { device: WorldDevice; log: DeviceFirmwareLogEntry[] } {
  if (device.firmware === offer.version) {
    return { device, log: [...log] };
  }

  return {
    device: { ...device, firmware: offer.version, status: "updated" },
    log: [
      {
        version: offer.version,
        installedOn: now.toISOString().slice(0, 10),
        notes: offer.notes,
        uploadedBy: offer.uploadedBy,
      },
      ...log,
    ],
  };
}
