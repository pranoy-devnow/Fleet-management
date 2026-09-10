import { describe, expect, it } from "vitest";

import { formatFirmwareHistorySubtitle } from "./format-firmware-history";

describe("formatFirmwareHistorySubtitle", () => {
  it("leads with device type and region", () => {
    expect(
      formatFirmwareHistorySubtitle({
        version: "v2.4.0",
        date: "2025-12-10",
        region: "Europe",
        deviceType: "Symphony",
        status: "active",
        devices: 10,
        notes: "Battery optimisation",
      }),
    ).toBe("Symphony · Europe · 2025-12-10 · Battery optimisation");
  });

  it("keeps all-target values readable", () => {
    expect(
      formatFirmwareHistorySubtitle({
        version: "v2.5.0",
        date: "2026-09-10",
        region: "All regions",
        deviceType: "All device types",
        status: "active",
        devices: 0,
        notes: "Rollout",
      }),
    ).toBe("All device types · All regions · 2026-09-10 · Rollout");
  });

  it("does not mention a hospital", () => {
    expect(
      formatFirmwareHistorySubtitle({
        version: "v2.0.0",
        date: "2024-06-01",
        region: "Europe",
        deviceType: "Swing Maxi",
        status: "recalled",
        devices: 0,
        notes: "Do not deploy",
      }),
    ).not.toMatch(/hospital/i);
  });
});
