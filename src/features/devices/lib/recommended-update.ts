import type { FirmwareRelease } from "@/features/firmware/types";

import type { FirmwareUpdateOffer, WorldDevice } from "../types";
import { availableFirmwareUpdates } from "./available-updates";
import { isNewerFirmware } from "./compare-firmware";

/**
 * Picks the newest package newer than the firmware already installed.
 * Recalled packages are never offered.
 *
 * @param device - Device with a current firmware and model
 * @param releases - Published firmware catalog
 * @returns Version and notes to show as the default update, or null when current
 */
export function recommendedFirmwareUpdate(
  device: Pick<WorldDevice, "firmware" | "model">,
  releases: readonly FirmwareRelease[],
): FirmwareUpdateOffer | null {
  return (
    availableFirmwareUpdates(device, releases).find((offer) =>
      isNewerFirmware(offer.version, device.firmware),
    ) ?? null
  );
}
