import { CheckCircle } from "lucide-react";

import type { DeviceUpdateStage } from "@/features/devices/lib/update-progress";

/**
 * In-card loading state for a running or finished device firmware install.
 *
 * @param progress - 0–1 completion
 * @param stage - Copy for the current step
 */
export function DeviceUpdateProgress({
  progress,
  stage,
}: {
  progress: number;
  stage: DeviceUpdateStage;
}) {
  const percent = Math.round(progress * 100);
  const done = stage.id === "done";

  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      {done ? (
        <div className="flex items-center gap-2 text-sm font-semibold text-status-updated">
          <CheckCircle size={18} />
          Done
        </div>
      ) : (
        <p className="text-sm font-medium text-foreground">{stage.label}</p>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-100"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{percent}%</p>
    </div>
  );
}
