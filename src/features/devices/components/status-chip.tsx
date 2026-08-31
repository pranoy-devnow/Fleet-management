import { STATUS_CHIP_STYLES, STATUS_LABELS } from "@/features/devices/constants";
import type { DeviceStatus } from "@/features/devices/types";
import { cn } from "@/lib/utils";

/**
 * Status pill used everywhere a device state appears (amber / green / red).
 */
export function StatusChip({ status }: { status: DeviceStatus }) {
  const style = STATUS_CHIP_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        style.className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {STATUS_LABELS[status]}
    </span>
  );
}
