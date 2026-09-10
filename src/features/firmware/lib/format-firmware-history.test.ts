import { describe, expect, it } from "vitest";

import { formatFirmwareHistorySubtitle } from "./format-firmware-history";

const release = {
  version: "v2.4.0",
  date: "2025-12-10",
  region: "Europe",
  deviceType: "Symphony",
  status: "active" as const,
  devices: 10,
  notes: "Battery optimisation",
  uploadedBy: "Sarah Chen",
};

describe("formatFirmwareHistorySubtitle", () => {
  it("shows notes and the uploader name", () => {
    expect(formatFirmwareHistorySubtitle(release)).toBe(
      "Battery optimisation · Uploaded by: Sarah Chen",
    );
  });

  it("does not include device type, region, or date", () => {
    expect(formatFirmwareHistorySubtitle(release)).not.toMatch(
      /Symphony|Europe|2025-12-10/,
    );
  });

  it("does not mention a hospital", () => {
    expect(formatFirmwareHistorySubtitle(release)).not.toMatch(/hospital/i);
  });
});
