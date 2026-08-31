"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, RefreshCw, Upload } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { listHospitals } from "@/features/devices/repositories/device-repository";
import { DEPLOY_LABELS, RELEASE_STATUS_STYLES } from "@/features/firmware/constants";
import type { DeployType, FirmwareRelease } from "@/features/firmware/types";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { NativeSelect } from "@/features/shell/native-select";
import { Panel } from "@/features/shell/panel";

/**
 * Firmware release detail with optional edit mode for the prototype.
 */
export function FirmwareDetail({ release }: { release: FirmwareRelease }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState({
    version: release.version,
    notes: release.notes,
    region: release.region,
    hospital: "All hospitals",
    deployType: "immediate" as DeployType,
    date: "",
    time: "",
  });
  const [draft, setDraft] = useState(saved);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const status = RELEASE_STATUS_STYLES[release.status];
  const hospitals = [["All hospitals", "All hospitals"], ...listHospitals().map((name) => [name, name] as const)] as const;

  function save() {
    setSaved(draft);
    setIsEditing(false);
    setSaveSuccess(true);
    window.setTimeout(() => setSaveSuccess(false), 3000);
  }

  return (
    <AppShell
      title={`Firmware ${saved.version}`}
      subtitle={`${release.model} — ${saved.region}`}
      variant="form"
      headerAction={
        isEditing ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => { setDraft(saved); setIsEditing(false); }} className="h-auto rounded-[6px] border-primary px-5 py-2.5 text-primary">
              Cancel
            </Button>
            <Button onClick={save} className="h-auto gap-2 rounded-[6px] px-5 py-2.5">
              <CheckCircle size={14} /> Save changes
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {release.status === "active" ? (
              <Button render={<Link href="/internal/firmware/upload" />} className="h-auto gap-2 rounded-[6px] px-5 py-2.5">
                <Upload size={14} /> Upload New Version
              </Button>
            ) : null}
            <Button variant="outline" onClick={() => setIsEditing(true)} className="h-auto gap-2 rounded-[6px] border-primary px-5 py-2.5 text-primary">
              <RefreshCw size={14} /> Edit
            </Button>
          </div>
        )
      }
    >
      <BackLink href="/internal/firmware" label="Back to Firmware History" />
      {saveSuccess ? (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-[#13985A]">
          <CheckCircle size={16} /> Changes saved successfully.
        </div>
      ) : null}
      {isEditing ? (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-secondary px-4 py-3 text-sm text-primary">
          <RefreshCw size={15} className="shrink-0" />
          You are editing firmware details. Changes apply to this release record only.
        </div>
      ) : null}
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
              {isEditing ? (
                <input
                  className="w-full rounded-[6px] border border-border bg-white px-3 py-2.5 font-mono text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
                  value={draft.version}
                  onChange={(event) => setDraft((current) => ({ ...current, version: event.target.value }))}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-foreground">{saved.version}</span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${status.className}`}>
                    <span className={`size-2 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Release notes</label>
              {isEditing ? (
                <Textarea
                  rows={4}
                  value={draft.notes}
                  onChange={(event) => setDraft((current) => ({ ...current, notes: event.target.value }))}
                  className="resize-none rounded-[6px] bg-white"
                />
              ) : (
                <p className="text-sm leading-relaxed text-[#374151]">{saved.notes}</p>
              )}
            </div>
          </div>
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-4 font-semibold text-foreground">Deployment Target</h3>
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <NativeSelect label="Region" value={draft.region} onChange={(value) => setDraft((current) => ({ ...current, region: value }))} options={[["Global", "Global"], ["Europe", "Europe"], ["United States", "United States"], ["Other countries", "Other countries"]]} />
              <NativeSelect label="Hospital" value={draft.hospital} onChange={(value) => setDraft((current) => ({ ...current, hospital: value }))} options={hospitals} />
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-sm text-foreground">
              <div>Region: {saved.region}</div>
              <div>Hospital: {saved.hospital}</div>
            </div>
          )}
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-1 font-semibold text-foreground">Scheduler</h3>
          <p className="mb-4 text-xs text-muted-foreground">Set when the firmware update should activate on target devices.</p>
          {isEditing ? (
            <NativeSelect
              label="Deployment type"
              value={draft.deployType}
              onChange={(value) => setDraft((current) => ({ ...current, deployType: value as DeployType }))}
              options={[
                ["immediate", DEPLOY_LABELS.immediate],
                ["scheduled", DEPLOY_LABELS.scheduled],
                ["maintenance", DEPLOY_LABELS.maintenance],
              ]}
            />
          ) : (
            <span className="text-sm text-foreground">{DEPLOY_LABELS[saved.deployType]}</span>
          )}
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-1 font-semibold text-foreground">Deployment Summary</h3>
          <p className="mb-4 text-xs text-muted-foreground">{release.devices.toLocaleString()} devices currently on this firmware</p>
          {release.devices > 0 ? (
            <div className="flex flex-col gap-3">
              {[
                { label: "Updated", count: Math.round(release.devices * 0.72), color: "bg-[#13985A]" },
                { label: "Needs update", count: Math.round(release.devices * 0.21), color: "bg-[#CE7A0E]" },
                { label: "Failed", count: Math.round(release.devices * 0.07), color: "bg-[#D32F27]" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium text-foreground">{row.count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${row.color}`} style={{ width: `${(row.count / release.devices) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-destructive">Recalled — no devices should remain on this version.</p>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
