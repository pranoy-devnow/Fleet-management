import { z } from "zod";

/**
 * Fields collected when a signed-in biomed adds another device. Personal and
 * account details are deliberately absent: the account already exists.
 */
export const addDeviceSchema = z.object({
  country: z.string().min(1, "Choose the country the device is in"),
  serial: z.string().trim().min(1, "Device serial number is required"),
  model: z.string().min(1, "Select a model"),
  ward: z.string().trim().min(1, "Ward is required"),
});

export type AddDeviceInput = z.infer<typeof addDeviceSchema>;
