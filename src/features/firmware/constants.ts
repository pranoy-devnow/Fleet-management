/** Regions a firmware release can target. Values are stored on the release. */
export const FIRMWARE_REGION_VALUES = [
  "All regions",
  "Europe",
  "United States",
  "Other countries",
] as const;

/** Device types a firmware release can target. Values are stored on the release. */
export const FIRMWARE_DEVICE_TYPE_VALUES = [
  "All device types",
  "Freestyle Hands-free",
  "Symphony",
  "Swing Maxi",
] as const;

/** `[value, label]` pairs for the upload region select. */
export const FIRMWARE_REGION_OPTIONS = FIRMWARE_REGION_VALUES.map(
  (value) => [value, value] as const,
);

/** `[value, label]` pairs for the upload device-type select. */
export const FIRMWARE_DEVICE_TYPE_OPTIONS = FIRMWARE_DEVICE_TYPE_VALUES.map(
  (value) => [value, value] as const,
);

export const DEPLOY_LABELS = {
  immediate: "Deploy immediately on publish",
  scheduled: "Schedule for a specific date & time",
} as const;

/** `[value, label]` pairs for the upload scheduler. */
export const DEPLOY_TYPE_OPTIONS = [
  ["immediate", DEPLOY_LABELS.immediate],
  ["scheduled", DEPLOY_LABELS.scheduled],
] as const;
