import { describe, expect, it } from "vitest";

import { publishFirmwareSchema } from "./schemas";

describe("publishFirmwareSchema", () => {
  it("accepts a region and device type from the shared options", () => {
    const result = publishFirmwareSchema.safeParse({
      version: "v2.5.0",
      notes: "Notes",
      region: "Europe",
      deviceType: "Symphony",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a blank version", () => {
    const result = publishFirmwareSchema.safeParse({
      version: "   ",
      notes: "Notes",
      region: "Europe",
      deviceType: "Symphony",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter a version label");
    }
  });

  it("rejects a hospital field as the device target", () => {
    const result = publishFirmwareSchema.safeParse({
      version: "v2.5.0",
      notes: "Notes",
      region: "Europe",
      deviceType: "Charité — NICU Ward 3",
    });

    expect(result.success).toBe(false);
  });
});
