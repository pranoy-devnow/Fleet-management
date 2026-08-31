import type { FirmwareReleaseStatus } from "./types";

export const RELEASE_STATUS_STYLES: Record<
  FirmwareReleaseStatus,
  { label: string; dot: string; className: string }
> = {
  active: {
    label: "Active",
    dot: "bg-[#13985A]",
    className: "bg-green-50 text-[#13985A] border-green-200",
  },
  superseded: {
    label: "Superseded",
    dot: "bg-[#6B7280]",
    className: "bg-gray-50 text-[#6B7280] border-gray-200",
  },
  recalled: {
    label: "Recalled",
    dot: "bg-[#D32F27]",
    className: "bg-red-50 text-[#D32F27] border-red-200",
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
