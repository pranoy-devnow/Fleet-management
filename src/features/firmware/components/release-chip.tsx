import { RELEASE_STATUS_STYLES } from "@/features/firmware/constants";
import type { FirmwareReleaseStatus } from "@/features/firmware/types";
import { cn } from "@/lib/utils";

/**
 * Lifecycle chip for a firmware release (active / superseded / recalled).
 */
export function ReleaseChip({ status }: { status: FirmwareReleaseStatus }) {
  const style = RELEASE_STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        style.className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {style.label}
    </span>
  );
}
