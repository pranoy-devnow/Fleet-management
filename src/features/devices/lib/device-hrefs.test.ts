import { describe, expect, it } from "vitest";

import { biomedDeviceHref } from "./device-hrefs";

describe("biomedDeviceHref", () => {
  it("points the status view at the light status page", () => {
    expect(biomedDeviceHref("KF-2024-00931", "status")).toBe(
      "/biomed/devices/KF-2024-00931/status",
    );
  });

  it("points the update view at the device detail page", () => {
    expect(biomedDeviceHref("KF-2024-00931", "update")).toBe("/biomed/devices/KF-2024-00931");
  });

  it("escapes a serial that would otherwise break the path", () => {
    expect(biomedDeviceHref("KF/2024 00931", "update")).toBe(
      "/biomed/devices/KF%2F2024%2000931",
    );
  });
});
