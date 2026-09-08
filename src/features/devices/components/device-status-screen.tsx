"use client";

import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DeviceDetailRows } from "@/features/devices/components/device-detail-rows";
import { StatusChip } from "@/features/devices/components/status-chip";
import { DEFAULT_DEVICE_MODEL, LAST_SYNC_EXAMPLE } from "@/features/devices/constants";
import { useAssignedDevices } from "@/features/devices/hooks/use-assigned-devices";
import { biomedDeviceHref } from "@/features/devices/lib/device-hrefs";
import { RemoveDeviceButton } from "@/features/devices/components/remove-device-button";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { Panel } from "@/features/shell/panel";

/**
 * Light status view for one of the biomed's devices.
 *
 * The live list is the only source: it is seeded with every fixture device, so
 * a device missing from it was either never registered or just removed.
 *
 * @param deviceId - Serial from the route
 */
export function DeviceStatusScreen({ deviceId }: { deviceId: string }) {
  const { devices } = useAssignedDevices();
  const device = devices.find((item) => item.id === deviceId);
  if (!device) notFound();

  const rows: Array<[string, string]> = [
    ["Firmware version", device.firmware],
    ["Last sync", device.isNew ? "Just registered" : LAST_SYNC_EXAMPLE],
    ["Location / Hospital", `${device.hospital} — ${device.ward}`],
    ["Model", `Medela ${device.model ?? DEFAULT_DEVICE_MODEL}`],
  ];
  if (device.country) rows.push(["Country", device.country]);

  return (
    <AppShell title="Device Status">
      <BackLink href="/biomed/welcome" label="Back to dashboard" />
      <div className="flex max-w-xl flex-col gap-5">
        <Panel className="p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-foreground">{device.id}</h2>
            <div className="mt-2">
              <StatusChip status={device.status} />
            </div>
          </div>
          <DeviceDetailRows rows={rows} />
        </Panel>
        <Panel className="p-5">
          <p className="mb-3 text-sm text-muted-foreground">Want to install the update?</p>
          <div className="flex gap-3">
            <Button
              render={<Link href={biomedDeviceHref(device.id, "update")} />}
              className="h-auto rounded-[6px] px-5 py-2.5"
            >
              Go to Device Detail &amp; Update
            </Button>
            {/* Sits apart from the update action so a destructive click is deliberate. */}
            <RemoveDeviceButton deviceId={device.id} className="ml-auto" />
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
