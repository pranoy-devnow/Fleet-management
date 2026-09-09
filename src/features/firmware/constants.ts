import type { FirmwareReleaseStatus } from "./types";

export const RELEASE_STATUS_STYLES: Record<
  FirmwareReleaseStatus,
  { label: string; dot: string; className: string }
> = {
  active: {
    label: "Active",
    dot: "bg-status-updated",
    className: "bg-status-updated-tint text-status-updated border-status-updated/25",
  },
  superseded: {
    label: "Superseded",
    dot: "bg-status-neutral",
    className: "bg-status-neutral-tint text-status-neutral border-status-neutral/25",
  },
  recalled: {
    label: "Recalled",
    dot: "bg-status-failed",
    className: "bg-status-failed-tint text-status-failed border-status-failed/25",
  },
};

export const FIRMWARE_STATUS_OPTIONS = [
  ["all", "All statuses"],
  ["active", "Active"],
  ["superseded", "Superseded"],
  ["recalled", "Recalled"],
] as const;

export const FIRMWARE_REGION_OPTIONS = [
  ["all", "All regions"],
  ["Global", "Global"],
  ["Europe", "Europe"],
  ["United States", "United States"],
] as const;

export const FIRMWARE_MODEL_OPTIONS = [
  ["all", "All models"],
  ["Freestyle Hands-free", "Freestyle Hands-free"],
  ["Symphony", "Symphony"],
  ["Swing Maxi", "Swing Maxi"],
] as const;

export const DEPLOY_LABELS = {
  immediate: "Deploy immediately on publish",
  scheduled: "Schedule for a specific date & time",
  maintenance: "Deploy during next maintenance window",
} as const;
