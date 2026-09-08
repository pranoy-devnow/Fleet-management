/**
 * Which of the two biomed device pages a device row opens.
 *
 * `status` is the light read-only view a biomed lands on right after
 * registering; `update` is the full detail page with firmware actions.
 */
export type BiomedDeviceView = "status" | "update";

/**
 * Route for one of the biomed's devices.
 *
 * @param deviceId - Device serial
 * @param view - Which device page to open
 */
export function biomedDeviceHref(deviceId: string, view: BiomedDeviceView): string {
  const base = `/biomed/devices/${encodeURIComponent(deviceId)}`;
  return view === "status" ? `${base}/status` : base;
}
