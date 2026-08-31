import { describe, expect, it } from "vitest";

import type { WorldDevice } from "../types";
import { sortWorldDevices } from "./sort-devices";

function device(partial: Pick<WorldDevice, "id" | "city" | "status" | "firmware">): WorldDevice {
  return {
    country: "X",
    region: "europe",
    lat: 0,
    lon: 0,
    hospital: "H",
    model: "Symphony",
    ...partial,
  };
}

describe("sortWorldDevices", () => {
  it("sorts device IDs ascending without mutating the input", () => {
    const input = [device({ id: "KF-2", city: "B", status: "updated", firmware: "v2" }), device({ id: "KF-1", city: "A", status: "failed", firmware: "v1" })];
    const result = sortWorldDevices(input, "id", true);
    expect(result.map((item) => item.id)).toEqual(["KF-1", "KF-2"]);
    expect(input[0]?.id).toBe("KF-2");
  });

  it("reverses the order when ascending is false", () => {
    const input = [device({ id: "KF-1", city: "Berlin", status: "updated", firmware: "v1" }), device({ id: "KF-2", city: "Zurich", status: "failed", firmware: "v2" })];
    const result = sortWorldDevices(input, "city", false);
    expect(result.map((item) => item.city)).toEqual(["Zurich", "Berlin"]);
  });

  it("returns an empty list when given no devices", () => {
    expect(sortWorldDevices([], "id", true)).toEqual([]);
  });
});
