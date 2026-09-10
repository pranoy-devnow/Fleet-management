import { describe, expect, it } from "vitest";

import type { FirmwareRelease } from "@/features/firmware/types";

import type { WorldDevice } from "../types";
import { createDeviceCatalogStore } from "./device-catalog-store";

const device: WorldDevice = {
  id: "KF-1",
  city: "Berlin",
  country: "Germany",
  region: "europe",
  status: "needs-update",
  hospital: "Charité",
  firmware: "v2.3.1",
  model: "Freestyle Hands-free",
};

const releases: FirmwareRelease[] = [
  { version: "v2.3.1", date: "2025-09-04", region: "Europe", deviceType: "Freestyle Hands-free", status: "superseded", devices: 1, notes: "EU patch", uploadedBy: "Sarah Chen" },
];

describe("createDeviceCatalogStore", () => {
  it("seeds a log from the catalog", () => {
    const store = createDeviceCatalogStore([device], releases);
    expect(store.getSnapshot().logs["KF-1"]?.[0]?.version).toBe("v2.3.1");
  });

  it("applies an update and notifies subscribers", () => {
    const store = createDeviceCatalogStore([device], releases);
    let heard = 0;
    store.subscribe(() => {
      heard += 1;
    });

    const updated = store.applyUpdate(
      "KF-1",
      { version: "v2.4.0", notes: "Battery" },
      new Date("2026-09-10T12:00:00.000Z"),
    );

    expect(heard).toBe(1);
    expect(updated?.firmware).toBe("v2.4.0");
    expect(store.getSnapshot().devices[0]?.status).toBe("updated");
    expect(store.getSnapshot().logs["KF-1"]?.[0]?.version).toBe("v2.4.0");
  });

  it("returns null when the device is missing", () => {
    const store = createDeviceCatalogStore([device], releases);
    expect(store.applyUpdate("nope", { version: "v2.4.0", notes: "Battery" })).toBeNull();
  });
});
