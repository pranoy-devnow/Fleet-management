"use client";

import { useMemo, useState } from "react";
import { Filter, Globe } from "lucide-react";

import { DeviceStatusModal } from "@/features/devices/components/device-status-modal";
import { FleetMapCanvas } from "@/features/devices/components/fleet-map-canvas";
import { MapHoverPanel } from "@/features/devices/components/map-hover-panel";
import { StatusLegend } from "@/features/devices/components/status-legend";
import { MODEL_OPTIONS, REGION_OPTIONS, STATUS_OPTIONS } from "@/features/devices/constants";
import { filterWorldDevices, hasActiveDeviceFilters } from "@/features/devices/lib/filter-devices";
import { listHospitals, listWorldDevices } from "@/features/devices/repositories/device-repository";
import type { DeviceFilters, WorldDevice } from "@/features/devices/types";
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
 * Inline global fleet map on the Medela internal dashboard.
 */
export function DashboardFleetMap() {
  const devices = useMemo(() => listWorldDevices(), []);
  const hospitals = useMemo(
    () => [["all", "All hospitals"], ...listHospitals().map((name) => [name, name] as const)] as const,
    [],
  );
  const [filters, setFilters] = useState<DeviceFilters>(emptyFilters);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selected, setSelected] = useState<WorldDevice | null>(null);

  const visible = filterWorldDevices(devices, filters);
  const visibleIds = new Set(visible.map((device) => device.id));
  const hovered = devices.find((device) => device.id === hoveredId) ?? null;

  function update(key: keyof DeviceFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <Panel className="mb-6 overflow-hidden">
      <div className="flex items-center border-b border-muted px-5 py-3">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Global Fleet</span>
          <span className="text-xs text-[#9CA3AF]">
            — {visible.length} of {devices.length} devices
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-muted bg-[#FAFBFC] px-5 py-2.5">
        <Filter size={13} className="shrink-0 text-[#9CA3AF]" />
        <NativeSelect compact highlightWhenSet label="Hospital" value={filters.hospital} onChange={(value) => update("hospital", value)} options={hospitals} />
        <NativeSelect compact highlightWhenSet label="Region" value={filters.region} onChange={(value) => update("region", value)} options={REGION_OPTIONS} />
        <NativeSelect compact highlightWhenSet label="Model" value={filters.model} onChange={(value) => update("model", value)} options={MODEL_OPTIONS} />
        <NativeSelect compact highlightWhenSet label="Status" value={filters.status} onChange={(value) => update("status", value)} options={STATUS_OPTIONS} />
        {hasActiveDeviceFilters(filters) ? (
          <button type="button" onClick={() => setFilters(emptyFilters)} className="ml-1 text-xs font-medium text-destructive hover:underline">
            Clear
          </button>
        ) : null}
      </div>

      <div className="flex">
        <div className="min-w-0 flex-1">
          <FleetMapCanvas
            devices={devices}
            visibleIds={visibleIds}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onSelect={setSelected}
          />
        </div>
        <div className="flex w-52 shrink-0 flex-col justify-center border-l border-muted bg-white p-4">
          <MapHoverPanel device={hovered} />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-muted px-5 py-2.5">
        <StatusLegend />
      </div>

      {selected ? <DeviceStatusModal device={selected} onClose={() => setSelected(null)} /> : null}
    </Panel>
  );
}
