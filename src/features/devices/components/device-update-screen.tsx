"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DeviceDetailRows } from "@/features/devices/components/device-detail-rows";
import { StatusChip } from "@/features/devices/components/status-chip";
import { AVAILABLE_FIRMWARE, DEFAULT_DEVICE_MODEL } from "@/features/devices/constants";
import { UPDATE_HISTORY } from "@/features/devices/data/assigned-devices";
import { useAssignedDevices } from "@/features/devices/hooks/use-assigned-devices";
import { RemoveDeviceButton } from "@/features/devices/components/remove-device-button";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { Panel } from "@/features/shell/panel";

/**
 * Full detail and firmware-update view for one of the biomed's devices.
 *
 * The live list is the only source: it is seeded with every fixture device, so
 * a device missing from it was either never registered or just removed.
 *
 * @param deviceId - Serial from the route
 */
export function DeviceUpdateScreen({ deviceId }: { deviceId: string }) {
  const { devices } = useAssignedDevices();
  const device = devices.find((item) => item.id === deviceId);
  if (!device) notFound();

  return (
    <AppShell title="Device Detail & Update">
      <BackLink href="/biomed" label="Back to My Devices" />
      <div className="flex max-w-xl flex-col gap-5">
        <Panel className="p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-foreground">{device.id}</h2>
            <div className="mt-2">
              <StatusChip status={device.status} />
            </div>
          </div>
          <DeviceDetailRows
            rows={[
              ["Model", `Medela ${device.model ?? DEFAULT_DEVICE_MODEL}`],
              ["Current firmware", device.firmware],
              ["Available firmware", AVAILABLE_FIRMWARE],
              ["Location", `${device.hospital} — ${device.ward}`],
            ]}
          />
        </Panel>

        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 shrink-0 text-destructive" size={16} />
          <div>
            <p className="text-sm font-semibold text-destructive">Update failed — Error 0x4F2: connection timeout</p>
            <p className="mt-0.5 text-xs text-red-600">Shown when status = Failed. Verify device connectivity and retry.</p>
          </div>
        </div>

        <Panel className="p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Update History</h3>
          <div className="flex flex-col gap-2">
            {UPDATE_HISTORY.map((entry) => (
              <div key={entry.version} className="flex items-center justify-between border-b border-muted py-1.5 text-sm last:border-0">
                <span className="font-medium text-foreground">{entry.version}</span>
                <span className="text-muted-foreground">{entry.date}</span>
                <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs text-[#13985A]">{entry.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <div className="flex gap-3">
          <Button render={<Link href="/biomed" />} className="h-auto rounded-[6px] px-5 py-2.5">
            Start Update
          </Button>
          <Button variant="outline" render={<Link href="/biomed" />} className="h-auto rounded-[6px] border-primary px-5 py-2.5 text-primary">
            <RefreshCw size={14} className="mr-1.5" />
            Retry Update
          </Button>
          {/* Sits apart from the update actions so a destructive click is deliberate. */}
          <RemoveDeviceButton deviceId={device.id} className="ml-auto" />
        </div>
      </div>
    </AppShell>
  );
}
