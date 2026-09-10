import { describe, expect, it } from "vitest";

import type { FirmwareRelease } from "../types";
import { createFirmwareReleaseStore } from "./firmware-release-store";

const seed: FirmwareRelease[] = [
  { version: "v2.4.0", date: "2025-12-10", region: "All regions", deviceType: "Symphony", status: "active", devices: 10, notes: "Battery" },
];

describe("createFirmwareReleaseStore", () => {
  it("starts with the given catalog", () => {
    const store = createFirmwareReleaseStore(seed);
    expect(store.getSnapshot()).toHaveLength(1);
  });

  it("prepends a published release with the chosen target", () => {
    const store = createFirmwareReleaseStore(seed);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    const published = store.publish(
      {
        version: "v2.5.0",
        notes: "New radio",
        region: "United States",
        deviceType: "Swing Maxi",
      },
      new Date("2026-09-10T08:00:00.000Z"),
    );

    expect(heard).toBe(1);
    expect(published.region).toBe("United States");
    expect(published.deviceType).toBe("Swing Maxi");
    expect(store.getSnapshot()[0]).toEqual(published);
    expect(store.getSnapshot()).toHaveLength(2);
  });

  it("does not notify a listener after unsubscribe", () => {
    const store = createFirmwareReleaseStore(seed);
    let heard = 0;
    const stop = store.subscribe(() => {
      heard += 1;
    });

    stop();
    store.publish(
      { version: "v2.5.1", notes: "Patch", region: "Europe", deviceType: "Symphony" },
      new Date("2026-09-10T08:00:00.000Z"),
    );

    expect(heard).toBe(0);
  });
});
