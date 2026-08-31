import type { FirmwareRelease } from "../types";

export const FIRMWARE_RELEASES: FirmwareRelease[] = [
  { version: "v2.4.0", date: "2025-12-10", region: "Global", model: "Freestyle Hands-free", status: "active", devices: 442, notes: "Battery optimisation, improved connectivity stability." },
  { version: "v2.4.0", date: "2025-12-10", region: "Global", model: "Symphony", status: "active", devices: 198, notes: "Battery optimisation, improved connectivity stability." },
  { version: "v2.4.0", date: "2025-12-10", region: "Global", model: "Swing Maxi", status: "active", devices: 134, notes: "Battery optimisation, improved connectivity stability." },
  { version: "v2.3.1", date: "2025-09-04", region: "Europe", model: "Freestyle Hands-free", status: "superseded", devices: 312, notes: "EU compliance patch — CE re-certification." },
  { version: "v2.3.1", date: "2025-09-04", region: "Europe", model: "Symphony", status: "superseded", devices: 145, notes: "EU compliance patch — CE re-certification." },
  { version: "v2.3.0", date: "2025-07-18", region: "Global", model: "Freestyle Hands-free", status: "superseded", devices: 480, notes: "New OTA update engine, background sync." },
  { version: "v2.3.0", date: "2025-07-18", region: "Global", model: "Symphony", status: "superseded", devices: 200, notes: "New OTA update engine, background sync." },
  { version: "v2.2.9", date: "2025-05-22", region: "United States", model: "Freestyle Hands-free", status: "superseded", devices: 128, notes: "FDA 510(k) alignment update." },
  { version: "v2.2.8", date: "2025-03-11", region: "Global", model: "Freestyle Hands-free", status: "superseded", devices: 480, notes: "Sensor calibration fix." },
  { version: "v2.2.8", date: "2025-03-11", region: "Global", model: "Swing Maxi", status: "superseded", devices: 130, notes: "Sensor calibration fix." },
  { version: "v2.1.5", date: "2024-11-30", region: "Global", model: "Freestyle Hands-free", status: "superseded", devices: 320, notes: "Initial fleet deployment release." },
  { version: "v2.0.0", date: "2024-06-01", region: "Europe", model: "Freestyle Hands-free", status: "recalled", devices: 0, notes: "Recalled — connectivity regression. Do not deploy." },
];
