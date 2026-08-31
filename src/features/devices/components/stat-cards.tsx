import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { FLEET_STATS } from "@/features/devices/constants";
import { Panel } from "@/features/shell/panel";

const CARDS = [
  { label: "Total Devices", value: String(FLEET_STATS.totalDevices), color: "text-foreground", sub: "Across all regions", href: "/internal/devices" },
  { label: "Failed Update", value: String(FLEET_STATS.failedUpdates), color: "text-destructive", sub: "Require attention", href: "/internal/devices?status=failed" },
  { label: "Firmware History", value: String(FLEET_STATS.firmwareReleases), color: "text-primary", sub: "Releases published", href: "/internal/firmware" },
] as const;

/**
 * Widget-style summary tiles for the Medela overview.
 */
export function StatCards() {
  return (
    <div className="mb-8 grid grid-cols-3 gap-5">
      {CARDS.map((card) => (
        <Link key={card.label} href={card.href} className="group text-left">
          <Panel className="h-full p-6 transition-all duration-200 group-hover:-translate-y-px group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)]">
            <div className="flex items-start justify-between gap-3">
              <div className={`text-4xl font-semibold tracking-tight ${card.color}`}>{card.value}</div>
              <ChevronRight size={18} className="mt-1 shrink-0 text-muted-foreground/70" />
            </div>
            <div className="mt-3 text-sm font-medium text-foreground">{card.label}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{card.sub}</div>
          </Panel>
        </Link>
      ))}
    </div>
  );
}
