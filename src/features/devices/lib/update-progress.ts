/**
 * Prototype OTA is compressed so the flow is visible without waiting minutes.
 */
export const DEVICE_UPDATE_DURATION_MS = 12_000;

export type DeviceUpdateStageId = "preparing" | "transferring" | "installing" | "verifying" | "done";

export type DeviceUpdateStage = {
  id: DeviceUpdateStageId;
  label: string;
  /** Progress (0–1) at which this stage becomes current. */
  at: number;
};

export const DEVICE_UPDATE_STAGES: readonly DeviceUpdateStage[] = [
  { id: "preparing", label: "Preparing update…", at: 0 },
  { id: "transferring", label: "Sending firmware to the device…", at: 0.15 },
  { id: "installing", label: "Installing firmware…", at: 0.45 },
  { id: "verifying", label: "Verifying install…", at: 0.8 },
  { id: "done", label: "Done", at: 1 },
];

/**
 * Clamps elapsed time into a 0–1 progress value.
 *
 * @param elapsedMs - Milliseconds since the update started
 * @param durationMs - Total prototype duration
 */
export function updateProgressAt(elapsedMs: number, durationMs: number): number {
  if (durationMs <= 0) return 1;
  if (elapsedMs <= 0) return 0;
  return Math.min(1, elapsedMs / durationMs);
}

/**
 * Stage shown at a given progress. `done` only at 100%.
 *
 * @param progress - 0–1 progress
 */
export function updateStageAt(progress: number): DeviceUpdateStage {
  let current = DEVICE_UPDATE_STAGES[0]!;
  for (const stage of DEVICE_UPDATE_STAGES) {
    if (progress >= stage.at) current = stage;
  }
  return current;
}
