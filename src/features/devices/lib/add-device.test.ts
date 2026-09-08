import { describe, expect, it } from "vitest";

import type { AddDeviceInput } from "../schemas";
import type { AssignedDevice } from "../types";
import { addDevice } from "./add-device";

const existing: AssignedDevice = {
  id: "KF-2024-00931",
  hospital: "Charité",
  ward: "NICU Ward 3",
  status: "needs-update",
  firmware: "v2.3.1",
};

function input(overrides: Partial<AddDeviceInput> = {}): AddDeviceInput {
  return {
    country: "Germany",
    serial: "KF-2026-00042",
    model: "Symphony",
    ward: "NICU Ward 5",
    ...overrides,
  };
}

describe("addDevice", () => {
  it("puts the new device at the front of the list", () => {
    const result = addDevice([existing], input());

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.devices.map((device) => device.id)).toEqual([
      "KF-2026-00042",
      "KF-2024-00931",
    ]);
  });

  it("returns the device it created", () => {
    const result = addDevice([existing], input());

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.device).toBe(result.devices[0]);
  });

  it("adds to an empty list", () => {
    const result = addDevice([], input());

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.devices).toHaveLength(1);
  });

  it("rejects a serial that is already registered", () => {
    expect(addDevice([existing], input({ serial: "KF-2024-00931" }))).toEqual({
      ok: false,
      code: "duplicate_serial",
    });
  });

  it("rejects a duplicate serial typed in lower case", () => {
    expect(addDevice([existing], input({ serial: "kf-2024-00931" }))).toEqual({
      ok: false,
      code: "duplicate_serial",
    });
  });

  it("rejects a duplicate serial that differs only by surrounding spaces", () => {
    expect(addDevice([existing], input({ serial: " KF-2024-00931 " }))).toEqual({
      ok: false,
      code: "duplicate_serial",
    });
  });

  it("leaves the original list untouched", () => {
    const devices = [existing];
    addDevice(devices, input());
    expect(devices).toEqual([existing]);
  });
});
