import type { DeviceStatus } from "./types";

export const STATUS_LABELS: Record<DeviceStatus, string> = {
  "needs-update": "Needs Update",
  updated: "Updated",
  failed: "Failed Update",
};

export const STATUS_CHIP_STYLES: Record<
  DeviceStatus,
  { dot: string; className: string }
> = {
  "needs-update": {
    dot: "bg-status-needs",
    className: "bg-status-needs-tint text-status-needs border-status-needs/25",
  },
  updated: {
    dot: "bg-status-updated",
    className: "bg-status-updated-tint text-status-updated border-status-updated/25",
  },
  failed: {
    dot: "bg-status-failed",
    className: "bg-status-failed-tint text-status-failed border-status-failed/25",
  },
};

export const STATUS_ROW_BACKGROUNDS: Record<DeviceStatus, string> = {
  "needs-update": "bg-status-needs-tint",
  updated: "bg-status-updated-tint",
  failed: "bg-status-failed-tint",
};
