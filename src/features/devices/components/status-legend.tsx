import { StatusChip } from "@/features/devices/components/status-chip";
import type { DeviceStatus } from "@/features/devices/types";

const LEGEND: DeviceStatus[] = ["needs-update", "updated", "failed"];

/**
 * Compact reference of the three fleet status chips.
 */
export function StatusLegend() {
  return (
    <div className="flex flex-wrap gap-4">
      {LEGEND.map((status) => (
        <StatusChip key={status} status={status} />
      ))}
    </div>
  );
}
