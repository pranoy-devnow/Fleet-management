import { InfoTooltip } from "@/features/shell/info-tooltip";

import { PERMISSION_LABELS, ROLE_LABELS, ROLE_ORDER, ROLE_SUMMARIES } from "../constants";
import { permissionsForRole } from "../lib/role-permissions";
import type { PlatformRole } from "../types";

/**
 * Explains every role and what it grants, in plain language rather than raw
 * permission keys.
 *
 * @param side - Which side of the icon to open on
 */
export function RoleInfoTooltip({
  side = "bottom",
}: {
  side?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <InfoTooltip label="What each role can do" side={side}>
      <div className="flex flex-col gap-3">
        {ROLE_ORDER.map((role) => (
          <RoleSummary key={role} role={role} />
        ))}
      </div>
    </InfoTooltip>
  );
}

function RoleSummary({ role }: { role: PlatformRole }) {
  return (
    <div>
      <p className="text-xs font-semibold text-foreground">
        {ROLE_LABELS[role]} — {ROLE_SUMMARIES[role]}
      </p>
      <ul className="mt-1 flex flex-col gap-0.5">
        {permissionsForRole(role).map((permission) => (
          <li key={permission} className="flex gap-1.5 text-xs text-muted-foreground">
            <span aria-hidden="true">•</span>
            <span>{PERMISSION_LABELS[permission]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
