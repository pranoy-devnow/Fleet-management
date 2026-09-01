import { describe, expect, it } from "vitest";

import {
  describeRoleNotifications,
  roleNotificationCount,
} from "./role-notification-count";

describe("roleNotificationCount", () => {
  it("shows the pending count to an internal Admin", () => {
    expect(roleNotificationCount("internal", "admin", 3)).toBe(3);
  });

  it("hides the badge when the queue is empty", () => {
    expect(roleNotificationCount("internal", "admin", 0)).toBe(0);
  });

  it("hides the badge from IT, who cannot review requests", () => {
    expect(roleNotificationCount("internal", "it", 3)).toBe(0);
  });

  it("hides the badge on the hospital portal", () => {
    expect(roleNotificationCount("biomed", "admin", 3)).toBe(0);
  });

  it("hides the badge when the viewer is not in the directory", () => {
    expect(roleNotificationCount("internal", null, 3)).toBe(0);
  });
});

describe("describeRoleNotifications", () => {
  it("uses the singular for one request", () => {
    expect(describeRoleNotifications(1)).toBe("1 pending access request");
  });

  it("uses the plural for several requests", () => {
    expect(describeRoleNotifications(3)).toBe("3 pending access requests");
  });
});
