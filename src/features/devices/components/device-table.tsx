"use client";

import { useMemo, useState } from "react";

import { DeviceListEmpty } from "@/features/devices/components/device-list-empty";
import { DeviceListToolbar } from "@/features/devices/components/device-list-toolbar";
import { StatusChip } from "@/features/devices/components/status-chip";
import { DEVICE_LIST_TITLES } from "@/features/devices/constants";
import {
  emptyDeviceFilters,
  resetDeviceFilter,
  type DeviceFilterKey,
} from "@/features/devices/lib/device-filters";
import { filterWorldDevices, hasActiveDeviceFilters } from "@/features/devices/lib/filter-devices";
import { sortWorldDevices } from "@/features/devices/lib/sort-devices";
import { listHospitals, listWorldDevices } from "@/features/devices/repositories/device-repository";
import type { DeviceFilters, DeviceSortKey } from "@/features/devices/types";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { GroupedList, GroupedListRow } from "@/features/shell/grouped-list";

const SORT_OPTIONS: ReadonlyArray<readonly [DeviceSortKey, string]> = [
  ["id", "ID"],
  ["city", "Location"],
  ["status", "Status"],
  ["firmware", "Firmware"],
];

/**
 * Grouped fleet list for Medela staff.
 *
 * @param initialStatus - Status preselected by the route, e.g. `failed`
 */
export function DeviceTable({ initialStatus }: { initialStatus: string }) {
  const devices = useMemo(() => listWorldDevices(), []);
  const hospitals = useMemo(
    () => [["all", "All hospitals"], ...listHospitals().map((name) => [name, name] as const)] as const,
    [],
  );
  const [filters, setFilters] = useState<DeviceFilters>(() => emptyDeviceFilters(initialStatus));
  const [sortKey, setSortKey] = useState<DeviceSortKey>("id");
  const [sortAsc, setSortAsc] = useState(true);

  const rows = sortWorldDevices(filterWorldDevices(devices, filters), sortKey, sortAsc);
  const active = hasActiveDeviceFilters(filters);

  function relax(key: DeviceFilterKey) {
    setFilters((current) => resetDeviceFilter(current, key));
  }

  return (
    <AppShell
      title={DEVICE_LIST_TITLES[filters.status] ?? "Devices"}
      subtitle={listSubtitle(filters.status)}
      fill
    >
      <BackLink href="/internal" label="Overview" />
      <DeviceListToolbar
        filters={filters}
        onFiltersChange={setFilters}
        hospitals={hospitals}
        sort={{
          key: sortKey,
          ascending: sortAsc,
          options: SORT_OPTIONS,
          onKeyChange: setSortKey,
          onToggleDirection: () => setSortAsc((current) => !current),
        }}
      />
      <GroupedList
        scroll
        footer={
          <span role="status">
            {`Showing ${rows.length} of ${devices.length} devices${active ? " · filtered" : ""}`}
          </span>
        }
      >
        {rows.length === 0 ? (
          <DeviceListEmpty
            devices={devices}
            filters={filters}
            onRelax={relax}
            onClearAll={() => setFilters(emptyDeviceFilters())}
          />
        ) : (
          rows.map((device) => (
            <GroupedListRow
              key={device.id}
              href={`/internal/devices/${device.id}`}
              title={device.id}
              subtitle={`${device.city}, ${device.country} · ${device.hospital} · ${device.model} · ${device.firmware}`}
              trailing={<StatusChip status={device.status} />}
            />
          ))
        )}
      </GroupedList>
    </AppShell>
  );
}

/**
 * Describes the list's purpose. The visible count lives in the list footer, so
 * the subtitle stays qualitative and does not repeat it.
 */
function listSubtitle(status: string): string {
  if (status === "failed") return "Devices that need a retry";
  if (status === "needs-update") return "Devices waiting on a firmware update";
  if (status === "updated") return "Devices on the latest firmware";
  return "Every device in the fleet";
}
