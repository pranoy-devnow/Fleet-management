"use client";

import { X } from "lucide-react";

/**
 * One filter currently narrowing a list, described for display.
 * `key` identifies which filter to reset when the chip is dismissed.
 */
export type ActiveFilter<Key extends string = string> = {
  key: Key;
  facetLabel: string;
  valueLabel: string;
};

/**
 * Removable chips naming every active filter, so a narrowed list never looks
 * like a full one. Renders nothing when no filter is active.
 *
 * @param filters - Active filters, already resolved to display labels
 * @param onRemove - Receives the `key` of the chip the user dismissed
 * @param onClearAll - Resets every filter; only offered past a single chip
 */
export function ActiveFilterChips<Key extends string>({
  filters,
  onRemove,
  onClearAll,
}: {
  filters: readonly ActiveFilter<Key>[];
  onRemove: (key: Key) => void;
  onClearAll: () => void;
}) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <span
          key={filter.key}
          className="inline-flex items-center gap-1.5 rounded-full bg-black/5 py-1 pr-1 pl-2.5 text-xs"
        >
          <span className="text-muted-foreground">{filter.facetLabel}</span>
          <span className="font-medium text-foreground">{filter.valueLabel}</span>
          <button
            type="button"
            onClick={() => onRemove(filter.key)}
            aria-label={`Remove filter: ${filter.facetLabel} ${filter.valueLabel}`}
            className="flex size-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/8 hover:text-foreground"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      {filters.length > 1 ? (
        <button
          type="button"
          onClick={onClearAll}
          className="px-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
