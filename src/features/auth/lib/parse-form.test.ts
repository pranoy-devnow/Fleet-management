import { describe, expect, it } from "vitest";
import { z } from "zod";

import { parseFormData } from "./parse-form";

const schema = z.object({
  email: z.string().email("Enter a valid work email"),
});

function data(values: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [name, value] of Object.entries(values)) {
    formData.set(name, value);
  }
  return formData;
}

describe("parseFormData", () => {
  it("returns parsed data when the payload is valid", () => {
    const result = parseFormData(data({ email: "name@medela.com" }), schema);
    expect(result).toEqual({ ok: true, data: { email: "name@medela.com" } });
  });

  it("returns the first field error when validation fails", () => {
    const result = parseFormData(data({ email: "not-an-email" }), schema);
    expect(result).toEqual({ ok: false, message: "Enter a valid work email" });
  });

  it("returns a required-field message when the value is empty", () => {
    const result = parseFormData(data({ required: "" }), z.object({ required: z.string().min(1, "Required") }));
    expect(result).toEqual({ ok: false, message: "Required" });
  });
});
