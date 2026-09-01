import { ROLE_LABELS } from "../constants";
import type { PlatformRole } from "../types";

/**
 * Names the viewer's own access for the page subtitle.
 *
 * @param role - Viewer's role, or null when they are outside the directory
 */
export function describeViewerAccess(role: PlatformRole | null): string {
  if (role === "admin") return "You have Admin access";
  if (role === "it") return `You have ${ROLE_LABELS.it} access`;
  return "Directory of Medela users and hospital staff";
}
