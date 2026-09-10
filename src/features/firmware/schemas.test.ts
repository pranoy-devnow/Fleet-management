import { describe, expect, it } from "vitest";

import { publishFirmwareSchema } from "./schemas";

describe("publishFirmwareSchema", () => {
  it("accepts a version and notes", () => {
    const result = publishFirmwareSchema.safeParse({
      version: "v2.5.0",
      notes: "Notes",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a blank version", () => {
    const result = publishFirmwareSchema.safeParse({
      version: "   ",
      notes: "Notes",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter a version label");
    }
  });

  it("rejects blank notes", () => {
    const result = publishFirmwareSchema.safeParse({
      version: "v2.5.0",
      notes: "   ",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter release notes");
    }
  });
});
