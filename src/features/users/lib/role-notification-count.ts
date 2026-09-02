import type { PortalRole } from "@/features/account/types";

import { hasPermission } from "./role-permissions";
import type { PlatformRole } from "../types";

/**
 * How many role-management notifications the Role management button should show.
 *
 * Only an internal Admin sees access-request notifications. Hospital staff
 * and IT viewers get zero, so the badge never advertises a queue they cannot
 * act on.
 *
 * @param portal - Which portal the current path belongs to
 * @param role - Viewer's platform role, or null when they are not in the directory
 * @param pendingCount - Requests still waiting on a decision
 */
export function roleNotificationCount(
  portal: PortalRole,
  role: PlatformRole | null,
  pendingCount: number,
): number {
  if (portal !== "internal") return 0;
  if (!hasPermission(role, "requests:review")) return 0;
  if (pendingCount < 1) return 0;
  return pendingCount;
}

/**
 * Accessible summary of the pending queue for the header control.
 *
 * @param count - Visible notification count
 */
export function describeRoleNotifications(count: number): string {
  if (count === 1) return "1 pending access request";
  return `${count} pending access requests`;
}
