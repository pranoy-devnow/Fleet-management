"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { listHospitals } from "@/features/devices/repositories/device-repository";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { FormField } from "@/features/shell/form-field";
import { NativeSelect } from "@/features/shell/native-select";
import { Panel } from "@/features/shell/panel";

/**
 * Firmware publish form: file dropzone, release notes, target, and scheduler.
 */
export function UploadFirmwareForm() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [deployType, setDeployType] = useState("immediate");
  const hospitals = [["all", "All hospitals"], ...listHospitals().map((name) => [name, name] as const)] as const;

  return (
    <AppShell title="Upload New Firmware" subtitle="Publish a firmware release to the fleet" variant="form">
      <BackLink href="/internal" label="Back to Dashboard" />
      <div className="flex flex-col gap-5">
        <Panel className="p-6">
          <h3 className="mb-4 font-semibold text-foreground">Firmware File</h3>
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              setFileName(event.dataTransfer.files[0]?.name ?? "firmware.bin");
            }}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-10 transition-colors ${
              dragging ? "border-primary bg-secondary" : "border-border bg-[#F9FAFB]"
            }`}
          >
            <Upload className="text-[#9CA3AF]" size={28} />
            {fileName ? (
              <p className="text-sm font-medium text-foreground">{fileName}</p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Drag firmware file here, or{" "}
                  <span className="cursor-pointer font-medium text-primary hover:underline">Browse</span>
                </p>
                <p className="text-xs text-[#9CA3AF]">.bin, .img, .hex — max 500 MB</p>
              </>
            )}
          </div>
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-4 font-semibold text-foreground">Release Details</h3>
          <div className="flex flex-col gap-4">
            <FormField label="Version label" name="version" placeholder="v2.4.0" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Release notes</label>
              <Textarea
                rows={4}
                placeholder="Describe what changed in this firmware release…"
                className="resize-none rounded-[6px] bg-white placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-4 font-semibold text-foreground">Deployment Target</h3>
          <div className="flex flex-col gap-4">
            <NativeSelect
              label="Region"
              defaultValue="all"
              options={[
                ["all", "All regions"],
                ["europe", "Europe"],
                ["us", "United States"],
                ["other", "Other countries"],
              ]}
            />
            <NativeSelect label="Hospital" defaultValue="all" options={hospitals} />
            <p className="text-xs text-muted-foreground">
              The update will be pushed to devices matching both the selected region and hospital. Leave both as &quot;All&quot; for a global rollout.
            </p>
          </div>
        </Panel>

        <Panel className="p-6">
          <h3 className="mb-1 font-semibold text-foreground">Scheduler</h3>
          <p className="mb-4 text-xs text-muted-foreground">Set when the firmware update should activate on target devices.</p>
          <NativeSelect
            label="Deployment type"
            value={deployType}
            onChange={setDeployType}
            options={[
              ["immediate", "Deploy immediately on publish"],
              ["scheduled", "Schedule for a specific date & time"],
              ["maintenance", "Deploy during next maintenance window"],
            ]}
          />
          {deployType === "immediate" ? (
            <p className="mt-1 text-xs text-muted-foreground">The update will be pushed to target devices as soon as you click Publish Update.</p>
          ) : null}
          {deployType === "maintenance" ? (
            <p className="mt-1 text-xs text-muted-foreground">The update will be queued and delivered during the next scheduled maintenance window for each device.</p>
          ) : null}
          {deployType === "scheduled" ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <FormField label="Activation date" name="date" type="date" defaultValue="2026-01-15" />
              <FormField label="Activation time (UTC)" name="time" type="time" defaultValue="02:00" />
            </div>
          ) : null}
        </Panel>

        <Button onClick={() => router.push("/internal/firmware/notify")} className="h-auto self-start rounded-[6px] px-8 py-2.5">
          Publish Update
        </Button>
      </div>
    </AppShell>
  );
}
