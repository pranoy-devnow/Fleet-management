"use client";

import { DeviceFirmwareLogList } from "@/features/devices/components/device-firmware-log-list";
import { DeviceFirmwareUpdateCard } from "@/features/devices/components/device-firmware-update-card";
import { StatusChip } from "@/features/devices/components/status-chip";
import { useDeviceCatalog } from "@/features/devices/hooks/use-device-catalog";
import { availableFirmwareUpdates } from "@/features/devices/lib/available-updates";
import { useFirmwareReleases } from "@/features/firmware/hooks/use-firmware-releases";
import { BackLink } from "@/features/shell/back-link";
import { DefinitionList } from "@/features/shell/definition-list";
import { Panel } from "@/features/shell/panel";

/**
 * Device identity and the next firmware share one card; install history is
 * a second card below.
 *
 * @param deviceId - Serial from the route
 */
export function DeviceDetailScreen({ deviceId }: { deviceId: string }) {
  const { devices, logs, applyUpdate } = useDeviceCatalog();
  const { releases } = useFirmwareReleases();
  const device = devices.find((item) => item.id === deviceId);

  if (!device) {
    return (
      <>
        <BackLink href="/internal" label="Back to Dashboard" />
        <p className="text-sm text-muted-foreground">This device was not found.</p>
      </>
    );
  }

  const offers = availableFirmwareUpdates(device, releases);

  return (
    <>
      <BackLink href="/internal" label="Back to Dashboard" />
      <div className="flex max-w-xl flex-col gap-8">
        <Panel className="p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="text-2xl font-bold text-foreground">{device.id}</h2>
            <StatusChip status={device.status} />
          </div>
          <DefinitionList
            rows={[
              ["Model", `Medela ${device.model}`],
              ["Firmware version", device.firmware],
            ]}
          />
          <div className="mt-5 border-t border-black/6 pt-5">
            <DeviceFirmwareUpdateCard
              device={device}
              offers={offers}
              onFinished={(finished) => {
                applyUpdate(device.id, finished);
              }}
            />
          </div>
        </Panel>
        <DeviceFirmwareLogList entries={logs[device.id] ?? []} />
      </div>
    </>
  );
}
