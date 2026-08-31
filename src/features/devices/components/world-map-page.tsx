"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import { FleetMapCanvas } from "@/features/devices/components/fleet-map-canvas";
import { StatusChip } from "@/features/devices/components/status-chip";
import { StatusLegend } from "@/features/devices/components/status-legend";
import { MODEL_OPTIONS, REGION_OPTIONS, STATUS_OPTIONS } from "@/features/devices/constants";
import { filterWorldDevices } from "@/features/devices/lib/filter-devices";
import { listWorldDevices } from "@/features/devices/repositories/device-repository";
import type { DeviceFilters, WorldDevice } from "@/features/devices/types";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { NativeSelect } from "@/features/shell/native-select";
import { Panel } from "@/features/shell/panel";

const emptyFilters: DeviceFilters = {
  region: "all",
  status: "all",
  model: "all",
  hospital: "all",
  search: "",
};

/**
 * Full-page global fleet map with sidebar filters and hover details.
 */
export function WorldMapPage() {
  const devices = useMemo(() => listWorldDevices(), []);
  const [filters, setFilters] = useState<DeviceFilters>(emptyFilters);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visible = filterWorldDevices(devices, filters);
  const visibleIds = new Set(visible.map((device) => device.id));
  const hovered = devices.find((device) => device.id === hoveredId) ?? null;
  const counts = {
    updated: visible.filter((device) => device.status === "updated").length,
    needs: visible.filter((device) => device.status === "needs-update").length,
    failed: visible.filter((device) => device.status === "failed").length,
  };
  const countries = new Set(visible.map((device) => device.country)).size;

  return (
    <AppShell
      title="Global Fleet Map"
      subtitle={`${visible.length} device${visible.length === 1 ? "" : "s"} across ${countries} countries`}
    >
      <BackLink href="/internal" label="Back to Dashboard" />
      <div className="mb-5 flex flex-wrap gap-3">
        <CountChip label="Updated" count={counts.updated} className="border-green-200 bg-green-50 text-[#13985A]" />
        <CountChip label="Needs Update" count={counts.needs} className="border-amber-200 bg-amber-50 text-[#CE7A0E]" />
        <CountChip label="Failed" count={counts.failed} className="border-red-200 bg-red-50 text-[#D32F27]" />
      </div>
      <div className="flex items-start gap-5">
        <div className="flex w-56 shrink-0 flex-col gap-4">
          <Panel className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <Filter size={14} className="text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Filters</span>
            </div>
            <div className="flex flex-col gap-3">
              <NativeSelect label="Region" value={filters.region} onChange={(value) => setFilters((current) => ({ ...current, region: value }))} options={REGION_OPTIONS} />
              <NativeSelect label="Status" value={filters.status} onChange={(value) => setFilters((current) => ({ ...current, status: value }))} options={STATUS_OPTIONS} />
              <NativeSelect label="Model" value={filters.model} onChange={(value) => setFilters((current) => ({ ...current, model: value }))} options={MODEL_OPTIONS} />
              <button type="button" onClick={() => setFilters(emptyFilters)} className="mt-1 text-left text-xs text-primary hover:underline">
                Clear all filters
              </button>
            </div>
          </Panel>
          <HoverCard device={hovered} />
        </div>
        <Panel className="min-w-0 flex-1 overflow-hidden">
          <FleetMapCanvas
            devices={devices}
            visibleIds={visibleIds}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            aspectClass="pb-[50%]"
          />
          <div className="flex flex-wrap items-center gap-3 border-t border-border px-5 py-3">
            <span className="text-xs font-semibold text-muted-foreground">Legend:</span>
            <StatusLegend />
            <span className="ml-auto text-xs text-[#9CA3AF]">
              Hover a pin · {visible.length} device{visible.length === 1 ? "" : "s"} shown
            </span>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

function CountChip({ label, count, className }: { label: string; count: number; className: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 ${className}`}>
      <span className="text-2xl font-bold">{count}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function HoverCard({ device }: { device: WorldDevice | null }) {
  return (
    <Panel className={`p-4 transition-opacity duration-150 ${device ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      {device ? (
        <>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF]">Selected Device</div>
          <div className="text-sm leading-tight font-bold text-foreground">{device.id}</div>
          <div className="mt-0.5 mb-2 text-xs text-muted-foreground">
            {device.city}, {device.country}
          </div>
          <StatusChip status={device.status} />
          <div className="mt-3 flex flex-col gap-1">
            <div className="text-xs leading-snug text-muted-foreground">{device.hospital}</div>
            <div className="text-xs text-[#9CA3AF]">Firmware: {device.firmware}</div>
            <div className="text-xs text-[#9CA3AF]">Model: {device.model}</div>
          </div>
        </>
      ) : null}
    </Panel>
  );
}
