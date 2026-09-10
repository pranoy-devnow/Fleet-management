import type { PublishFirmwareInput } from "../schemas";
import type { FirmwareRelease } from "../types";

/**
 * Builds the release record that history and detail read after publish.
 *
 * @param input - Validated target and release details
 * @param now - Clock used for the release date; inject in tests
 * @returns A new active release; the input is not mutated
 */
export function createPublishedRelease(
  input: PublishFirmwareInput,
  now: Date,
): FirmwareRelease {
  return {
    version: input.version,
    notes: input.notes,
    region: input.region,
    deviceType: input.deviceType,
    date: now.toISOString().slice(0, 10),
    status: "active",
    devices: 0,
  };
}
