"use client";

import { AlertTriangle } from "lucide-react";

import { DEPLOY_LABELS } from "@/features/firmware/constants";
import { useFirmwareReleases } from "@/features/firmware/hooks/use-firmware-releases";
import { findFirmwareRelease } from "@/features/firmware/lib/find-firmware-release";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { Panel } from "@/features/shell/panel";

/**
 * Read-only firmware release detail. Target fields match the publish form:
 * region and device type, not hospital.
 *
 * @param version - Version label from the route
 * @param deviceType - Device type from the query string
 */
export function FirmwareDetail({
  version,
  deviceType,
}: {
  version: string;
  deviceType: string;
}) {
  const { releases } = useFirmwareReleases();
  const release = findFirmwareRelease(releases, version, deviceType);

  if (!release) {
    return (
      <AppShell title="Firmware" variant="form">
        <BackLink href="/internal/firmware" label="Back to Firmware History" />
        <p className="text-sm text-muted-foreground">This release was not found.</p>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={`Firmware ${release.version}`}
      subtitle={`${release.deviceType} — ${release.region}`}
      variant="form"
    >
      <BackLink href="/internal/firmware" label="Back to Firmware History" />
      {release.status === "recalled" ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 shrink-0 text-destructive" size={16} />
            <div>
              <p className="text-sm font-semibold text-destructive">Release Recalled</p>
              <p className="mt-1 text-xs leading-relaxed text-red-600">
                This firmware has been recalled and must not be deployed. Contact clinical engineering if any device is still running this version.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        <Panel className="p-6">
          <h3 className="mb-4 font-semibold text-foreground">Release Details</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Version label</label>
              <span className="font-mono text-sm text-foreground">{release.version}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Release notes</label>
              <p className="text-sm leading-relaxed text-foreground">{release.notes}</p>
            </div>
          </div>
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-4 font-semibold text-foreground">Deployment Target</h3>
          <div className="flex flex-col gap-3 text-sm text-foreground">
            <div>Region: {release.region}</div>
            <div>Device type: {release.deviceType}</div>
          </div>
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-1 font-semibold text-foreground">Scheduler</h3>
          <p className="mb-4 text-xs text-muted-foreground">Set when the firmware update should activate on target devices.</p>
          <span className="text-sm text-foreground">{DEPLOY_LABELS.immediate}</span>
        </Panel>
      </div>
    </AppShell>
  );
}
