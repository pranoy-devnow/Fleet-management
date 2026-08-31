import type { AssignedDevice } from "../types";

export const ASSIGNED_DEVICES: AssignedDevice[] = [
  {
    id: "KF-2024-00931",
    hospital: "Charité",
    ward: "NICU Ward 3",
    status: "needs-update",
    firmware: "v2.3.1",
  },
  {
    id: "KF-2024-00847",
    hospital: "Charité",
    ward: "NICU Ward 1",
    status: "updated",
    firmware: "v2.4.0",
  },
  {
    id: "KF-2023-00512",
    hospital: "Charité",
    ward: "NICU Ward 3",
    status: "failed",
    firmware: "v2.2.8",
  },
  {
    id: "KF-2024-01120",
    hospital: "Charité",
    ward: "NICU Ward 2",
    status: "updated",
    firmware: "v2.4.0",
  },
];

export const NEWLY_REGISTERED_DEVICE: AssignedDevice = {
  id: "KF-2024-01234",
  hospital: "Charité",
  ward: "NICU Ward 4",
  status: "needs-update",
  firmware: "v2.3.1",
  isNew: true,
};

export const UPDATE_HISTORY = [
  { version: "v2.3.1", date: "2025-11-14", status: "installed" },
  { version: "v2.2.8", date: "2025-08-03", status: "installed" },
  { version: "v2.1.5", date: "2025-04-17", status: "installed" },
] as const;
