"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { StatusChip } from "@/features/devices/components/status-chip";
import { listAssignedDevices, listWorldDevices } from "@/features/devices/repositories/device-repository";
import { searchAssignedDevices, searchWorldDevices } from "@/features/search/lib/search-devices";
import { SearchInputRow } from "@/features/shell/search-input-row";
import { useDismiss } from "@/features/shell/use-dismiss";

/**
 * App Store–style search pill. Opens a popover that filters devices as you type.
 */
export function HeaderSearch() {
  const pathname = usePathname();
  const isBiomed = pathname.startsWith("/biomed");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useDismiss(open, close);

  const results = useMemo(() => {
    if (isBiomed) return searchAssignedDevices(listAssignedDevices(), query);
    return searchWorldDevices(listWorldDevices(), query);
  }, [isBiomed, query]);

  function openSearch() {
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={rootRef} className="relative w-full max-w-md">
      <button
        type="button"
        onClick={openSearch}
        className="flex h-9 w-full items-center gap-2 rounded-full bg-black/5 px-3.5 text-sm text-muted-foreground transition-colors hover:bg-black/8"
        aria-expanded={open}
        aria-controls={inputId}
      >
        <Search size={15} className="shrink-0" />
        <span>Search</span>
      </button>

      {open ? (
        <div className="absolute top-0 right-0 left-0 z-50 overflow-hidden rounded-2xl bg-white/95 shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/8 backdrop-blur-xl">
          <SearchInputRow
            id={inputId}
            inputRef={inputRef}
            value={query}
            onChange={setQuery}
            placeholder="Device, city, or hospital"
          />
          <SearchResults query={query} isBiomed={isBiomed} results={results} onPick={close} />
        </div>
      ) : null}
    </div>
  );
}

function SearchResults({
  query,
  isBiomed,
  results,
  onPick,
}: {
  query: string;
  isBiomed: boolean;
  results: Array<{ id: string; hospital: string; status: "needs-update" | "updated" | "failed"; city?: string }>;
  onPick: () => void;
}) {
  if (!query.trim()) {
    return <p className="px-4 py-6 text-center text-sm text-muted-foreground">Type to find a device</p>;
  }

  if (results.length === 0) {
    return <p className="px-4 py-6 text-center text-sm text-muted-foreground">No devices match</p>;
  }

  return (
    <ul className="max-h-72 overflow-auto py-1">
      {results.map((device) => (
        <li key={device.id}>
          <Link
            href={isBiomed ? `/biomed/devices/${device.id}` : `/internal/devices/${device.id}`}
            onClick={onPick}
            className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-black/4"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">{device.id}</div>
              <div className="truncate text-xs text-muted-foreground">
                {device.city ? `${device.city} · ${device.hospital}` : device.hospital}
              </div>
            </div>
            <StatusChip status={device.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
