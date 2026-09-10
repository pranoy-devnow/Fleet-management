import { z } from "zod";

import {
  FIRMWARE_DEVICE_TYPE_VALUES,
  FIRMWARE_REGION_VALUES,
} from "./constants";

/**
 * Publish-form fields at the system boundary. Region and device type must be
 * one of the shared target options so history stores the same values.
 */
export const publishFirmwareSchema = z.object({
  version: z.string().trim().min(1, "Enter a version label"),
  notes: z.string().trim().min(1, "Enter release notes"),
  region: z.enum(FIRMWARE_REGION_VALUES, { error: "Select a region" }),
  deviceType: z.enum(FIRMWARE_DEVICE_TYPE_VALUES, { error: "Select a device type" }),
});

/** Validated publish-form input. */
export type PublishFirmwareInput = z.infer<typeof publishFirmwareSchema>;
