import { describe, expect, it } from "vitest";

import type { AddDeviceInput } from "../schemas";
import type { AssignedDevice } from "../types";
import { createAssignedDeviceStore } from "./assigned-device-store";

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

describe("createAssignedDeviceStore", () => {
  it("starts with the given devices", () => {
    const store = createAssignedDeviceStore([existing]);
    expect(store.getSnapshot()).toEqual([existing]);
  });

  it("starts empty when given no devices", () => {
    expect(createAssignedDeviceStore([]).getSnapshot()).toEqual([]);
  });

  it("notifies subscribers when a device is added", () => {
    const store = createAssignedDeviceStore([existing]);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    store.add(input());

    expect(heard).toBe(1);
    expect(store.getSnapshot()).toHaveLength(2);
  });

  it("hands back a new snapshot so React sees the change", () => {
    const store = createAssignedDeviceStore([existing]);
    const before = store.getSnapshot();

    store.add(input());

    expect(store.getSnapshot()).not.toBe(before);
  });

  it("does not notify or grow the list on a duplicate serial", () => {
    const store = createAssignedDeviceStore([existing]);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    expect(store.add(input({ serial: "KF-2024-00931" }))).toEqual({
      ok: false,
      code: "duplicate_serial",
    });
    expect(heard).toBe(0);
    expect(store.getSnapshot()).toHaveLength(1);
  });

  it("notifies subscribers when a device is removed", () => {
    const store = createAssignedDeviceStore([existing]);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    store.remove("KF-2024-00931");

    expect(heard).toBe(1);
    expect(store.getSnapshot()).toEqual([]);
  });

  it("does not notify when removing a device that is not on the list", () => {
    const store = createAssignedDeviceStore([existing]);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    expect(store.remove("KF-9999-99999")).toEqual({ ok: false, code: "not_found" });
    expect(heard).toBe(0);
    expect(store.getSnapshot()).toHaveLength(1);
  });

  it("frees a serial to be added again after it is removed", () => {
    const store = createAssignedDeviceStore([existing]);

    store.remove("KF-2024-00931");

    expect(store.add(input({ serial: "KF-2024-00931" })).ok).toBe(true);
  });

  it("stops notifying an unsubscribed listener", () => {
    const store = createAssignedDeviceStore([]);
    let heard = 0;
    const unsubscribe = store.subscribe(() => {
      heard += 1;
    });

    unsubscribe();
    store.add(input());

    expect(heard).toBe(0);
  });
});
