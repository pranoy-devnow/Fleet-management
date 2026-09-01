"use client";

import { useId, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { PopoverSurface } from "@/features/shell/popover-surface";
import { useDismiss } from "@/features/shell/use-dismiss";
import { cn } from "@/lib/utils";

import { PERMISSION_LABELS, ROLE_BADGE_STYLES, ROLE_LABELS, ROLE_ORDER } from "../constants";
import { permissionsForRole } from "../lib/role-permissions";
import type { PlatformRole } from "../types";

/**
 * Role picker shown to viewers who may reassign. The trigger doubles as the
 * badge, so a row never shows both a badge and a separate control.
 *
 * Each option lists what it grants inline rather than behind a nested tooltip:
 * a tooltip portal lives outside this popover, so pressing it would read as an
 * outside press and close the menu.
 *
 * @param userName - Whose role this is, used to name the trigger
 * @param role - Currently assigned role
 * @param onAssign - Receives the newly chosen role
 */
export function RoleMenu({
  userName,
  role,
  onAssign,
}: {
  userName: string;
  role: PlatformRole;
  onAssign: (role: PlatformRole) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useDismiss(open, () => setOpen(false));
  const panelId = useId();

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="menu"
        aria-label={`Change role for ${userName}, currently ${ROLE_LABELS[role]}`}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors hover:brightness-98 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none",
          ROLE_BADGE_STYLES[role],
        )}
      >
        {ROLE_LABELS[role]}
        <ChevronDown size={13} aria-hidden="true" />
      </button>

      {open ? (
        <PopoverSurface className="top-full right-0 z-50 mt-2 w-64 bg-white backdrop-blur-none">
          <div id={panelId} role="menu" aria-label={`Role for ${userName}`} className="p-1.5">
            {ROLE_ORDER.map((option) => (
              <RoleOption
                key={option}
                option={option}
                selected={option === role}
                onPick={() => {
                  onAssign(option);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </PopoverSurface>
      ) : null}
    </div>
  );
}

function RoleOption({
  option,
  selected,
  onPick,
}: {
  option: PlatformRole;
  selected: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      onClick={onPick}
      className="flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-black/4 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">
          {ROLE_LABELS[option]}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {permissionsForRole(option)
            .map((permission) => PERMISSION_LABELS[permission])
            .join(". ")}
        </span>
      </span>
      {selected ? <Check size={15} className="mt-0.5 shrink-0 text-primary" /> : null}
    </button>
  );
}
