import { z } from "zod";

/** First-time access request for Medela Internal staff. */
export const medelaRegisterSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid work email"),
  department: z.string().min(1, "Select a department"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/** Validated Medela Internal registration fields. */
export type MedelaRegisterInput = z.infer<typeof medelaRegisterSchema>;
