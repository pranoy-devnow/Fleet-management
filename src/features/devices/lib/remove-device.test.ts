import { describe, expect, it } from "vitest";

import type { AssignedDevice } from "../types";
import { removeDevice } from "./remove-device";

const first: AssignedDevice = {
  id: "KF-2024-00931",
  hospital: "Charité",
  ward: "NICU Ward 3",
  status: "needs-update",
  firmware: "v2.3.1",
};

const second: AssignedDevice = {
  id: "KF-2024-00847",
  hospital: "Charité",
  ward: "NICU Ward 1",
  status: "updated",
  firmware: "v2.4.0",
};

describe("removeDevice", () => {
  it("drops the named device and keeps the rest in order", () => {
    const result = removeDevice([first, second], "KF-2024-00931");

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.devices).toEqual([second]);
  });

  it("returns the device it removed", () => {
    const result = removeDevice([first, second], "KF-2024-00847");

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.device).toEqual(second);
  });

  it("empties a single-device list", () => {
    const result = removeDevice([first], "KF-2024-00931");

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.devices).toEqual([]);
  });

  it("reports an unknown serial as not found", () => {
    expect(removeDevice([first], "KF-9999-99999")).toEqual({ ok: false, code: "not_found" });
  });

  it("reports not found on an empty list", () => {
    expect(removeDevice([], "KF-2024-00931")).toEqual({ ok: false, code: "not_found" });
  });

  it("leaves the original list untouched", () => {
    const devices = [first, second];
    removeDevice(devices, "KF-2024-00931");
    expect(devices).toEqual([first, second]);
  });
});
