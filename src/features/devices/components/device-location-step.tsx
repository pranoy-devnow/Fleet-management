"use client";

import { useId, useMemo, useState } from "react";
import { Check } from "lucide-react";

import { searchDeviceCountries } from "@/features/devices/lib/search-countries";
import type { DeviceCountry } from "@/features/devices/types";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";
import { SearchableListPanel } from "@/features/shell/searchable-list-panel";
import { StepHeading } from "@/features/shell/step-heading";
import { cn } from "@/lib/utils";

/**
 * First step of any device flow: pick the country the device is in. Shared by
 * biomed registration and adding a device to an existing account.
 *
 * Search is the first row of the list panel — the same row the header search
 * popover uses — so typing a country or region is faster than scrolling.
 *
 * @param countries - Every country the fleet operates in
 * @param selected - Currently chosen country, or null before a first choice
 * @param onSelect - Receives the chosen country
 * @param onNext - Advances to the details step; only reachable once one is chosen
 * @param titleId - Optional id for the heading, so a dialog can label itself with it
 */
export function DeviceLocationStep({
  countries,
  selected,
  onSelect,
  onNext,
  titleId,
}: {
  countries: readonly DeviceCountry[];
  selected: DeviceCountry | null;
  onSelect: (country: DeviceCountry) => void;
  onNext: () => void;
  titleId?: string;
}) {
  const [query, setQuery] = useState("");
  const groupName = useId();
  const results = useMemo(() => searchDeviceCountries(countries, query), [countries, query]);

  return (
    <div className="flex flex-col gap-4">
      <StepHeading
        step={1}
        title="Where is the device?"
        subtitle="Choose the country this device is installed in"
        titleId={titleId}
      />

      <SearchableListPanel
        query={query}
        onQueryChange={setQuery}
        placeholder="Search country or region"
        searchLabel="Search countries"
        listLabel="Device country"
        listRole="radiogroup"
        announcement={`${results.length} of ${countries.length} countries match`}
        emptyMessage="No country matches that search. Try a region such as Europe."
        isEmpty={results.length === 0}
      >
        {results.map((entry) => (
          <CountryRow
            key={entry.country}
            entry={entry}
            groupName={groupName}
            selected={selected?.country === entry.country}
            onSelect={onSelect}
          />
        ))}
      </SearchableListPanel>

      <PrimaryActionButton
        type="button"
        onClick={onNext}
        disabled={selected === null}
        className="mt-1 w-full"
      >
        {selected ? `Continue with ${selected.country}` : "Select a country to continue"}
      </PrimaryActionButton>
    </div>
  );
}

function CountryRow({
  entry,
  groupName,
  selected,
  onSelect,
}: {
  entry: DeviceCountry;
  groupName: string;
  selected: boolean;
  onSelect: (country: DeviceCountry) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 px-4 py-3 transition-colors",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40 has-[:focus-visible]:ring-inset",
        selected ? "bg-primary/6" : "hover:bg-black/[0.03]",
      )}
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-foreground">
          {entry.country}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {entry.regionLabel}
        </span>
      </span>
      <input
        type="radio"
        name={groupName}
        value={entry.country}
        checked={selected}
        onChange={() => onSelect(entry)}
        className="sr-only"
      />
      {selected ? <Check size={18} className="shrink-0 text-primary" /> : null}
    </label>
  );
}
