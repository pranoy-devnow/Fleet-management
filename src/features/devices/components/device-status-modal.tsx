"use client";

import { X } from "lucide-react";

import { StatusChip } from "@/features/devices/components/status-chip";
import { AVAILABLE_FIRMWARE, LAST_SYNC_EXAMPLE, ASSIGNED_BIOMED } from "@/features/devices/constants";
import { formatRegionLabel } from "@/features/devices/lib/format-region";
import type { WorldDevice } from "@/features/devices/types";

/**
 * Modal opened from the dashboard map when a pin is selected.
 */
export function DeviceStatusModal({
  device,
  onClose,
}: {
  device: WorldDevice;
  onClose: () => void;
}) {
  const rows: Array<[string, string, boolean?]> = [
    ["Model", `Medela ${device.model}`],
    ["Firmware version", device.firmware],
    ["Available update", device.status === "updated" ? "None — up to date" : AVAILABLE_FIRMWARE, device.status !== "updated"],
    ["Last sync time", LAST_SYNC_EXAMPLE],
    ["Location / Hospital", device.hospital],
    ["Assigned Biomed", ASSIGNED_BIOMED],
    ["Region", formatRegionLabel(device.region)],
    ["Country", device.country],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-muted px-6 py-5">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">Device Status</div>
            <h2 className="text-xl font-bold text-foreground">{device.id}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {device.city}, {device.country}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-black/6 text-foreground transition-colors hover:bg-black/12 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
            aria-label="Close device details"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="mb-5">
            <StatusChip status={device.status} />
          </div>
          <div className="divide-y divide-muted">
            {rows.map(([label, value, emphasize]) => (
              <div key={label} className="flex gap-4 py-3">
                <span className="w-40 shrink-0 text-sm text-muted-foreground">{label}</span>
                <span className={`text-sm font-medium ${emphasize ? "text-[#CE7A0E]" : "text-foreground"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
