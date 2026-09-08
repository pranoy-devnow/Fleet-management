import type { ZodType } from "zod";

export type ParseFormResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

/**
 * Validates form fields at the system boundary with a Zod schema.
 *
 * @param formData - Submitted form entries
 * @param schema - Schema describing expected fields
 * @returns Parsed data, or the first actionable validation message
 */
export function parseFormData<T>(
  formData: FormData,
  schema: ZodType<T>,
): ParseFormResult<T> {
  const raw = Object.fromEntries(formData.entries());
  const result = schema.safeParse(raw);

  if (result.success) {
    return { ok: true, data: result.data };
  }

  const firstIssue = result.error.issues[0];
  return {
    ok: false,
    message: firstIssue?.message ?? "Check the form and try again",
  };
}
