import { ROLE_BADGE_STYLES, ROLE_LABELS } from "../constants";
import type { PlatformRole } from "../types";
import { cn } from "@/lib/utils";

/**
 * Read-only pill naming a user's role. Shown to viewers who cannot reassign.
 *
 * @param role - Role to display
 */
export function RoleBadge({ role }: { role: PlatformRole }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap",
        ROLE_BADGE_STYLES[role],
      )}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}
