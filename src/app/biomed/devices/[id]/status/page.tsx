import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DeviceDetailRows } from "@/features/devices/components/device-detail-rows";
import { StatusChip } from "@/features/devices/components/status-chip";
import { getAssignedDeviceById } from "@/features/devices/repositories/device-repository";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { Panel } from "@/features/shell/panel";

export default async function DeviceStatusLightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const device = getAssignedDeviceById(id);
  if (!device) notFound();

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
          <DeviceDetailRows
            rows={[
              ["Firmware version", device.firmware],
              ["Last sync", device.isNew ? "Just registered" : "2025-12-18 · 09:42 UTC"],
              ["Location / Hospital", `${device.hospital} — ${device.ward}`],
              ["Model", "Medela Freestyle Hands-free"],
            ]}
          />
        </Panel>
        <Panel className="p-5">
          <p className="mb-3 text-sm text-muted-foreground">Want to install the update?</p>
          <Button render={<Link href={`/biomed/devices/${device.id}`} />} className="h-auto rounded-[6px] px-5 py-2.5">
            Go to Device Detail &amp; Update
          </Button>
        </Panel>
      </div>
    </AppShell>
  );
}
