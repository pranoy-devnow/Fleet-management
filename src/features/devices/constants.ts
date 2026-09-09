import type { DeviceStatus } from "./types";

export const STATUS_LABELS: Record<DeviceStatus, string> = {
  "needs-update": "Needs Update",
  updated: "Updated",
  failed: "Failed Update",
};

/**
 * Pin fills for the fleet map, which needs concrete colours because SVG `fill`
 * cannot take a Tailwind class. Reads the theme tokens so the map, chips and row
 * shading can never disagree about what "failed" looks like.
 */
export const STATUS_PIN_COLORS: Record<DeviceStatus, string> = {
  "needs-update": "var(--status-needs)",
  updated: "var(--status-updated)",
  failed: "var(--status-failed)",
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

/**
 * Model choices for a form that registers one device, derived from the filter
 * list so a new model only has to be added in one place. The leading `all`
 * filter entry becomes an empty placeholder.
 */
export const DEVICE_MODEL_CHOICES: ReadonlyArray<readonly [string, string]> = [
  ["", "Select model…"],
  ...MODEL_OPTIONS.slice(1),
];

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

/** Hospital the prototype biomed account belongs to. */
export const BIOMED_HOSPITAL = "Charité";

/** Model shown for fixture devices, which predate recording a model per device. */
export const DEFAULT_DEVICE_MODEL = "Freestyle Hands-free";

/**
 * Firmware a device ships with. Units leave the factory a release behind
 * `AVAILABLE_FIRMWARE`, so a freshly added device starts as needs-update.
 */
export const NEW_DEVICE_FIRMWARE = "v2.3.1";
