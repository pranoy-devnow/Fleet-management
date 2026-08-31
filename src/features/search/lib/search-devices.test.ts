import { describe, expect, it } from "vitest";

import type { AssignedDevice, WorldDevice } from "@/features/devices/types";
import { searchAssignedDevices, searchWorldDevices } from "./search-devices";

const world: WorldDevice[] = [
  {
    id: "KF-2024-00931",
    city: "Berlin",
    country: "Germany",
    region: "europe",
    lat: 52,
    lon: 13,
    status: "needs-update",
    hospital: "Charité — NICU Ward 3",
    firmware: "v2.3.1",
    model: "Symphony",
  },
];

const assigned: AssignedDevice[] = [
  { id: "KF-2024-00931", hospital: "Charité", ward: "NICU Ward 3", status: "needs-update", firmware: "v2.3.1" },
];

describe("searchWorldDevices", () => {
  it("returns no rows when the query is empty", () => {
    expect(searchWorldDevices(world, "   ")).toEqual([]);
  });

  it("matches a device ID", () => {
    expect(searchWorldDevices(world, "00931").map((device) => device.id)).toEqual(["KF-2024-00931"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchWorldDevices(world, "zzz")).toEqual([]);
  });
});

describe("searchAssignedDevices", () => {
  it("matches hospital name", () => {
    expect(searchAssignedDevices(assigned, "charité")).toHaveLength(1);
  });
});
