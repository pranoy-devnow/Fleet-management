import type { Permission, PlatformRole } from "./types";

export const ROLE_LABELS: Record<PlatformRole, string> = {
  admin: "Admin",
  it: "IT",
};

/**
 * What each role grants. Deliberately disjoint: Admin reviews access requests,
 * IT runs the fleet. Neither is a superset of the other.
 */
export const ROLE_PERMISSIONS: Record<PlatformRole, readonly Permission[]> = {
  admin: ["requests:review"],
  it: ["overview:view", "firmware:upload"],
};

/**
 * Plain-language permission copy. Shown to admins instead of the raw
 * permission keys, which mean nothing outside the codebase.
 */
export const PERMISSION_LABELS: Record<Permission, string> = {
  "requests:review": "Accept or reject requests from people asking for platform access",
  "overview:view": "See the fleet overview",
  "firmware:upload": "Upload firmware",
};

/** One-line summary of each role, used above the permission list. */
export const ROLE_SUMMARIES: Record<PlatformRole, string> = {
  admin: "Controls who gets into the platform",
  it: "Runs the device fleet day to day",
};

export const ROLE_BADGE_STYLES: Record<PlatformRole, string> = {
  admin: "bg-primary/8 text-primary border-primary/20",
  it: "bg-black/5 text-muted-foreground border-black/10",
};

/** Roles offered in the assign menu, in display order. */
export const ROLE_ORDER: readonly PlatformRole[] = ["admin", "it"];
