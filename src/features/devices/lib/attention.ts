import type { DeviceStatus, WorldDevice } from "../types";

/**
 * Failed first, then pending updates. Updated devices are excluded.
 *
 * @param devices - Fleet devices to scan
 * @returns Devices that need attention, failed first
 */
export function devicesNeedingAttention<T extends { status: DeviceStatus }>(devices: T[]): T[] {
  return devices
    .filter((device) => device.status === "failed" || device.status === "needs-update")
    .sort((left, right) => Number(right.status === "failed") - Number(left.status === "failed"));
}

/**
 * Recommended next step for a device that is not current.
 *
 * @param status - Device firmware status
 */
export function recommendedAction(status: DeviceStatus): { label: string; kind: "retry" | "pending" } | null {
  if (status === "failed") return { label: "Retry update", kind: "retry" };
  if (status === "needs-update") return { label: "See pending", kind: "pending" };
  return null;
}

/**
 * Summarizes how many fleet devices need a retry or a pending update.
 *
 * @param devices - Fleet to summarize
 */
export function attentionSentence(devices: readonly WorldDevice[]): string {
  const failed = devices.filter((device) => device.status === "failed").length;
  const pending = devices.filter((device) => device.status === "needs-update").length;
  if (failed === 0 && pending === 0) return "Everything is current.";
  if (failed > 0 && pending > 0) {
    return `${failed} failed · ${pending} waiting for v2.4.0`;
  }
  if (failed > 0) return `${failed} device${failed === 1 ? "" : "s"} need you to retry`;
  return `${pending} device${pending === 1 ? "" : "s"} still need v2.4.0`;
}
