"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Single-track segmented control for the one filter axis that stays visible.
 *
 * Built on native radio inputs so arrow-key navigation and the selected state
 * are announced without hand-rolled ARIA.
 *
 * @param value - Currently selected option value
 * @param onChange - Receives the newly selected option value
 * @param options - `[value, label]` pairs rendered left to right
 * @param label - Accessible name for the group, e.g. "Filter by status"
 */
export function SegmentedControl({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<readonly [string, string]>;
  label: string;
}) {
  const name = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-black/5 p-0.5"
    >
      {options.map(([optionValue, optionLabel]) => {
        const selected = value === optionValue;
        return (
          <label
            key={optionValue}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40",
              selected
                ? "bg-white text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={selected}
              onChange={() => onChange(optionValue)}
              className="sr-only"
            />
            {optionLabel}
          </label>
        );
      })}
    </div>
  );
}
