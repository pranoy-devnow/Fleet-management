import { z } from "zod";

/**
 * Publish-form fields at the system boundary. Version and notes are required;
 * target and schedule are not collected on this form.
 */
export const publishFirmwareSchema = z.object({
  version: z.string().trim().min(1, "Enter a version label"),
  notes: z.string().trim().min(1, "Enter release notes"),
});

/** Validated publish-form input. */
export type PublishFirmwareInput = z.infer<typeof publishFirmwareSchema>;
