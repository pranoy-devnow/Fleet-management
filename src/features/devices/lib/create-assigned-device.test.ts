import { describe, expect, it } from "vitest";

import { BIOMED_HOSPITAL, NEW_DEVICE_FIRMWARE } from "../constants";
import type { AddDeviceInput } from "../schemas";
import { createAssignedDevice } from "./create-assigned-device";

function input(overrides: Partial<AddDeviceInput> = {}): AddDeviceInput {
  return {
    country: "Germany",
    serial: "KF-2026-00042",
    model: "Symphony",
    ward: "NICU Ward 5",
    ...overrides,
  };
}

describe("createAssignedDevice", () => {
  it("uses the serial as the device id", () => {
    expect(createAssignedDevice(input()).id).toBe("KF-2026-00042");
  });

  it("uppercases and trims a hand-typed serial", () => {
    expect(createAssignedDevice(input({ serial: "  kf-2026-00042 " })).id).toBe("KF-2026-00042");
  });

  it("trims the ward", () => {
    expect(createAssignedDevice(input({ ward: "  NICU Ward 5  " })).ward).toBe("NICU Ward 5");
  });

  it("assigns the device to the biomed's hospital", () => {
    expect(createAssignedDevice(input()).hospital).toBe(BIOMED_HOSPITAL);
  });

  it("starts a new device on shipped firmware needing an update", () => {
    const device = createAssignedDevice(input());
    expect(device).toMatchObject({ status: "needs-update", firmware: NEW_DEVICE_FIRMWARE });
  });

  it("flags the device as new so the list can highlight it", () => {
    expect(createAssignedDevice(input()).isNew).toBe(true);
  });

  it("keeps the country chosen in step one", () => {
    expect(createAssignedDevice(input({ country: "Japan" })).country).toBe("Japan");
  });

  it("keeps the chosen model", () => {
    expect(createAssignedDevice(input({ model: "Swing Maxi" })).model).toBe("Swing Maxi");
  });

  it("preserves unicode in the ward name", () => {
    expect(createAssignedDevice(input({ ward: "Säuglingsstation" })).ward).toBe("Säuglingsstation");
  });
});
