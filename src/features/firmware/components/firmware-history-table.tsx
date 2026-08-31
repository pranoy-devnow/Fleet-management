"use client";

import { useMemo, useState } from "react";
import { Upload } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FirmwareListToolbar } from "@/features/firmware/components/firmware-list-toolbar";
import { ReleaseChip } from "@/features/firmware/components/release-chip";
import { filterFirmwareReleases, hasActiveFirmwareFilters } from "@/features/firmware/lib/filter-releases";
import { emptyFirmwareFilters } from "@/features/firmware/lib/firmware-filters";
import { countActiveReleases, listFirmwareReleases } from "@/features/firmware/repositories/firmware-repository";
import type { FirmwareFilters } from "@/features/firmware/types";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { GroupedList, GroupedListEmpty, GroupedListRow } from "@/features/shell/grouped-list";

/**
 * Grouped firmware history for Medela staff.
 */
export function FirmwareHistoryTable() {
  const releases = useMemo(() => listFirmwareReleases(), []);
  const [filters, setFilters] = useState<FirmwareFilters>(emptyFirmwareFilters);
  const rows = filterFirmwareReleases(releases, filters);
  const active = hasActiveFirmwareFilters(filters);

  return (
    <AppShell
      title="Firmware"
      subtitle={`${countActiveReleases()} active · ${rows.length} shown`}
      headerAction={
        <Button render={<Link href="/internal/firmware/upload" />} className="h-auto gap-2 rounded-full px-4 py-2">
          <Upload size={15} />
          Upload firmware
        </Button>
      }
    >
      <BackLink href="/internal" label="Overview" />
      <FirmwareListToolbar filters={filters} onFiltersChange={setFilters} />
      <GroupedList
        footer={
          <span role="status">
            {`Showing ${rows.length} of ${releases.length} releases${active ? " · filtered" : ""}`}
          </span>
        }
      >
        {rows.length === 0 ? (
          <GroupedListEmpty>No releases match</GroupedListEmpty>
        ) : (
          rows.map((release, index) => (
            <GroupedListRow
              key={`${release.version}-${release.model}-${index}`}
              href={`/internal/firmware/${release.version}?model=${encodeURIComponent(release.model)}`}
              title={release.version}
              subtitle={`${release.model} · ${release.region} · ${release.date} · ${release.notes}`}
              trailing={<ReleaseChip status={release.status} />}
            />
          ))
        )}
      </GroupedList>
    </AppShell>
  );
}
