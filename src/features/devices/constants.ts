import type { DeviceStatus } from "./types";

export const STATUS_LABELS: Record<DeviceStatus, string> = {
  "needs-update": "Needs Update",
  updated: "Updated",
  failed: "Failed Update",
};

export const STATUS_PIN_COLORS: Record<DeviceStatus, string> = {
  "needs-update": "#CE7A0E",
  updated: "#13985A",
  failed: "#D32F27",
};

export const STATUS_CHIP_STYLES: Record<
  DeviceStatus,
  { dot: string; className: string }
> = {
  "needs-update": {
    dot: "bg-[#CE7A0E]",
    className: "bg-amber-50 text-[#CE7A0E] border-amber-200",
  },
  updated: {
    dot: "bg-[#13985A]",
    className: "bg-green-50 text-[#13985A] border-green-200",
  },
  failed: {
    dot: "bg-[#D32F27]",
    className: "bg-red-50 text-[#D32F27] border-red-200",
  },
};

export const STATUS_ROW_BACKGROUNDS: Record<DeviceStatus, string> = {
  "needs-update": "bg-amber-50",
  updated: "bg-green-50",
  failed: "bg-red-50",
};

export const REGION_OPTIONS = [
  ["all", "All regions"],
  ["north-america", "North America"],
  ["europe", "Europe"],
  ["asia-pacific", "Asia Pacific"],
  ["latin-america", "Latin America"],
  ["mea", "Middle East & Africa"],
] as const;

export const STATUS_OPTIONS = [
  ["all", "All statuses"],
  ["updated", "Updated"],
  ["needs-update", "Needs Update"],
  ["failed", "Failed Update"],
] as const;

export const MODEL_OPTIONS = [
  ["all", "All models"],
  ["Freestyle Hands-free", "Freestyle Hands-free"],
  ["Symphony", "Symphony"],
  ["Swing Maxi", "Swing Maxi"],
] as const;

export const DEVICE_LIST_TITLES: Record<string, string> = {
  all: "All Devices",
  updated: "Updated Devices",
  "needs-update": "Devices Needing Update",
  failed: "Failed Updates",
};

export const MAP_VIEWBOX = { width: 2000, height: 1000 } as const;

export const FLEET_STATS = {
  totalDevices: 482,
  failedUpdates: 4,
  firmwareReleases: 12,
} as const;

export const AVAILABLE_FIRMWARE = "v2.4.0";
export const LAST_SYNC_EXAMPLE = "2025-12-18 · 09:42 UTC";
export const ASSIGNED_BIOMED = "Dr. Marco Rossi · bioeng@charite.de";
