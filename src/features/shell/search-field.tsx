"use client";

import { Search } from "lucide-react";

/**
 * Rounded search pill used on list toolbars and the registration location
 * picker. Matches the header search: fill, no ring, icon then input.
 *
 * @param value - Current query
 * @param onChange - Receives the new query
 * @param placeholder - Hint text, also the input's accessible name unless `label` is given
 * @param label - Explicit accessible name, when the placeholder is not descriptive enough
 */
export function SearchField({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
}) {
  return (
    <label className="flex h-9 min-w-[14rem] flex-1 items-center gap-2 rounded-full bg-black/5 px-3.5 focus-within:bg-black/8">
      <Search size={15} aria-hidden="true" className="shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}
