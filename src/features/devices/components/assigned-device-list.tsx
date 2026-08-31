import { StatusChip } from "@/features/devices/components/status-chip";
import { GroupedList, GroupedListRow } from "@/features/shell/grouped-list";
import type { AssignedDevice } from "@/features/devices/types";

/**
 * Clickable assigned-device rows used on biomed dashboards.
 */
export function AssignedDeviceList({
  devices,
  hrefFor,
}: {
  devices: AssignedDevice[];
  hrefFor: (device: AssignedDevice) => string;
}) {
  return (
    <GroupedList footer={`${devices.length} device${devices.length === 1 ? "" : "s"} assigned to you`}>
      {devices.map((device) => (
        <GroupedListRow
          key={device.id}
          href={hrefFor(device)}
          title={
            <span className="inline-flex items-center gap-2">
              {device.id}
              {device.isNew ? (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-primary">
                  just registered
                </span>
              ) : null}
            </span>
          }
          subtitle={`${device.hospital} — ${device.ward} · ${device.firmware}`}
          trailing={<StatusChip status={device.status} />}
        />
      ))}
    </GroupedList>
  );
}
