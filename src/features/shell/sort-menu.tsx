"use client";

import { useId, useState } from "react";
import { ArrowDown, ArrowUpDown, ArrowUp } from "lucide-react";

import { PopoverSurface } from "@/features/shell/popover-surface";
import { useDismiss } from "@/features/shell/use-dismiss";

/**
 * Sort control collapsed into the list toolbar.
 *
 * Choosing the already-active key flips the direction, matching the behavior of
 * a sortable column header.
 *
 * @param sortKey - Currently active sort key
 * @param sortAsc - Whether the active key sorts ascending
 * @param options - `[key, label]` pairs offered in the menu
 * @param onChange - Receives a newly chosen key
 * @param onToggleDirection - Called when the active key is chosen again
 */
export function SortMenu<Key extends string>({
  sortKey,
  sortAsc,
  options,
  onChange,
  onToggleDirection,
}: {
  sortKey: Key;
  sortAsc: boolean;
  options: ReadonlyArray<readonly [Key, string]>;
  onChange: (key: Key) => void;
  onToggleDirection: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useDismiss(open, () => setOpen(false));
  const panelId = useId();
  const activeLabel = options.find(([key]) => key === sortKey)?.[1] ?? "";
  const DirectionIcon = sortAsc ? ArrowUp : ArrowDown;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-9 items-center gap-1.5 rounded-full bg-black/5 px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-black/8 hover:text-foreground"
      >
        <ArrowUpDown size={14} />
        <span className="whitespace-nowrap">{activeLabel}</span>
        <DirectionIcon size={12} />
      </button>

      {open ? (
        <PopoverSurface className="top-full right-0 mt-2 w-48">
          <div id={panelId} className="p-2">
            {options.map(([key, label]) => {
              const active = key === sortKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => (active ? onToggleDirection() : onChange(key))}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-black/4"
                >
                  <span>{label}</span>
                  {active ? <DirectionIcon size={14} className="text-primary" /> : null}
                </button>
              );
            })}
          </div>
        </PopoverSurface>
      ) : null}
    </div>
  );
}
