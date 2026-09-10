"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFleetNavDeviceCount } from "@/features/shell/hooks/use-fleet-nav-device-count";
import { FLEET_TAB_HREFS, resolveFleetTab, type FleetTab } from "@/features/shell/lib/fleet-tabs";
import { cn } from "@/lib/utils";

const TABS: ReadonlyArray<{ id: FleetTab; label: string; href: string }> = [
  { id: "devices", label: "Devices", href: FLEET_TAB_HREFS.devices },
  { id: "history", label: "Firmware history", href: FLEET_TAB_HREFS.history },
  { id: "upload", label: "Upload firmware", href: FLEET_TAB_HREFS.upload },
];

/**
 * Horizontal tabs for the three fleet screens. The Devices tab reads the
 * visible device count from the shared store so it follows list filters.
 */
export function FleetNavTabs() {
  const pathname = usePathname();
  const current = resolveFleetTab(pathname);
  const { count: deviceCount, label: deviceCountLabel } = useFleetNavDeviceCount();

  return (
    <nav aria-label="Fleet sections" className="mb-4 shrink-0">
      <div
        role="tablist"
        className="flex items-center gap-1 border-b border-black/6"
      >
        {TABS.map((tab) => {
          const selected = tab.id === current;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              role="tab"
              aria-selected={selected}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                selected
                  ? "text-foreground after:absolute after:right-3 after:bottom-0 after:left-3 after:h-0.5 after:rounded-full after:bg-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              {tab.id === "devices" && deviceCount !== undefined ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-sm font-semibold tabular-nums",
                    selected ? "bg-black/5 text-foreground" : "bg-black/5 text-muted-foreground",
                  )}
                  aria-label={deviceCountLabel}
                >
                  {deviceCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
