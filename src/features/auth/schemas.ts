import { z } from "zod";

/** Work-email sign-in for Medela Internal staff. */
export const medelaLoginSchema = z.object({
  email: z.string().email("Enter a valid work email"),
  password: z.string().min(1, "Password is required"),
});

/** First-time access request for Medela Internal staff. */
export const medelaRegisterSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid work email"),
  department: z.string().min(1, "Select a department"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/** Validated Medela Internal sign-in fields. */
export type MedelaLoginInput = z.infer<typeof medelaLoginSchema>;

/** Validated Medela Internal registration fields. */
export type MedelaRegisterInput = z.infer<typeof medelaRegisterSchema>;
