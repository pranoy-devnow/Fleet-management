import { notFound } from "next/navigation";

import { DeviceDetailRows } from "@/features/devices/components/device-detail-rows";
import { StatusChip } from "@/features/devices/components/status-chip";
import { ASSIGNED_BIOMED, LAST_SYNC_EXAMPLE } from "@/features/devices/constants";
import { getWorldDeviceById } from "@/features/devices/repositories/device-repository";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { Panel } from "@/features/shell/panel";

export default async function DeviceStatusDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const device = getWorldDeviceById(id);
  if (!device) notFound();

  return (
    <AppShell title="Device Status Detail">
      <BackLink href="/internal" label="Back to Dashboard" />
      <div className="max-w-xl">
        <Panel className="p-6">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-foreground">{device.id}</h2>
            <div className="mt-2">
              <StatusChip status={device.status} />
            </div>
          </div>
          <DeviceDetailRows
            rows={[
              ["Model", `Medela ${device.model}`],
              ["Firmware version", device.firmware],
              ["Last sync time", LAST_SYNC_EXAMPLE],
              ["Location / Hospital", device.hospital],
              ["Assigned Biomed", ASSIGNED_BIOMED],
            ]}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
