"use client";

import { useId, useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";

import { PopoverSurface } from "@/features/shell/popover-surface";
import { useDismiss } from "@/features/shell/use-dismiss";
import { ALL_FILTER_VALUE } from "@/lib/filters";
import { cn } from "@/lib/utils";

/**
 * One collapsible facet inside the filter menu. Exactly one value is selected
 * at a time; the "all" sentinel means the facet is inactive.
 */
export type FilterGroup<Key extends string = string> = {
  key: Key;
  label: string;
  value: string;
  options: ReadonlyArray<readonly [string, string]>;
  /** Cap the option list height and scroll it. Use for unbounded lists. */
  scroll?: boolean;
};

/**
 * Secondary filters collapsed behind a single trigger, so the list keeps its
 * vertical space for rows instead of controls.
 *
 * @param groups - Facets to render, in display order
 * @param activeCount - Number of facets currently narrowing the list; shown on the trigger
 * @param onChange - Receives the group key and the newly selected value
 */
export function FilterMenu<Key extends string>({
  groups,
  activeCount,
  onChange,
}: {
  groups: readonly FilterGroup<Key>[];
  activeCount: number;
  onChange: (groupKey: Key, value: string) => void;
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
        className={cn(
          "flex h-9 items-center gap-2 rounded-full px-3.5 text-xs font-medium transition-colors",
          activeCount > 0
            ? "bg-primary text-primary-foreground"
            : "bg-black/5 text-muted-foreground hover:bg-black/8 hover:text-foreground",
        )}
      >
        <SlidersHorizontal size={14} />
        Filter
        {activeCount > 0 ? (
          <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-[11px] leading-none">
            {activeCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <PopoverSurface className="top-full right-0 mt-2 w-72">
          <div id={panelId} className="max-h-[70vh] divide-y divide-black/6 overflow-auto">
            {groups.map((group) => (
              <FilterGroupSection key={group.key} group={group} onChange={onChange} />
            ))}
          </div>
        </PopoverSurface>
      ) : null}
    </div>
  );
}

function FilterGroupSection<Key extends string>({
  group,
  onChange,
}: {
  group: FilterGroup<Key>;
  onChange: (groupKey: Key, value: string) => void;
}) {
  const name = useId();

  return (
    <fieldset className="px-2 py-2">
      <legend className="px-2 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {group.label}
      </legend>
      <div className={cn(group.scroll && "max-h-44 overflow-auto")}>
        {group.options.map(([optionValue, optionLabel]) => {
          const selected = group.value === optionValue;
          return (
            <label
              key={optionValue}
              className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-black/4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40"
            >
              {/* The section heading already names the facet, so "All regions"
                  would read the facet twice. */}
              <span className="truncate">
                {optionValue === ALL_FILTER_VALUE ? "All" : optionLabel}
              </span>
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={selected}
                onChange={() => onChange(group.key, optionValue)}
                className="sr-only"
              />
              {selected ? <Check size={15} className="shrink-0 text-primary" /> : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
