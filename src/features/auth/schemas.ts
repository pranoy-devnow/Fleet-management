import { z } from "zod";

export const medelaLoginSchema = z.object({
  email: z.string().email("Enter a valid work email"),
  password: z.string().min(1, "Password is required"),
});

export const medelaRegisterSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid work email"),
  department: z.string().min(1, "Select a department"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const biomedLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const biomedRegisterSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  hospital: z.string().min(1, "Hospital is required"),
  serial: z.string().min(1, "Device serial number is required"),
  model: z.string().min(1, "Select a model"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type MedelaLoginInput = z.infer<typeof medelaLoginSchema>;
export type MedelaRegisterInput = z.infer<typeof medelaRegisterSchema>;
export type BiomedLoginInput = z.infer<typeof biomedLoginSchema>;
export type BiomedRegisterInput = z.infer<typeof biomedRegisterSchema>;
