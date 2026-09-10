"use client";

import { useRef } from "react";

import { DeviceUpdateProgress } from "@/features/devices/components/device-update-progress";
import { useDeviceUpdateRun } from "@/features/devices/hooks/use-device-update-run";
import type { FirmwareUpdateOffer, WorldDevice } from "@/features/devices/types";
import { InfoTooltip } from "@/features/shell/info-tooltip";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";

/**
 * Update action that sits inside the device card: next version, details, start.
 *
 * @param device - Device being updated
 * @param offer - Recommended package, or null when already current
 * @param onFinished - Called once the prototype install completes
 */
export function DeviceFirmwareUpdateCard({
  device,
  offer,
  onFinished,
}: {
  device: WorldDevice;
  offer: FirmwareUpdateOffer | null;
  onFinished: (offer: FirmwareUpdateOffer) => void;
}) {
  const offerRef = useRef(offer);
  offerRef.current = offer;
  const { phase, progress, stage, start } = useDeviceUpdateRun(() => {
    const finished = offerRef.current;
    if (finished) onFinished(finished);
  });

  const startLabel = device.status === "failed" ? "Retry update" : "Start update";

  if (phase === "idle" && !offer) {
    return (
      <p className="text-sm text-muted-foreground">This device is on the latest firmware.</p>
    );
  }

  return (
    <div
      className={
        phase === "done"
          ? "rounded-xl bg-status-updated-tint px-4 py-4"
          : "rounded-xl bg-black/4 px-4 py-4"
      }
    >
      {phase === "idle" && offer ? (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground">Available update</p>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">{offer.version}</p>
              <InfoTooltip label="Update details">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex gap-4">
                    <dt className="w-16 shrink-0 text-muted-foreground">Version</dt>
                    <dd className="font-medium text-foreground">{offer.version}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-16 shrink-0 text-muted-foreground">Details</dt>
                    <dd className="text-foreground">{offer.notes}</dd>
                  </div>
                </dl>
              </InfoTooltip>
            </div>
            <PrimaryActionButton type="button" onClick={start} className="h-10 shrink-0 px-4 text-sm">
              {startLabel}
            </PrimaryActionButton>
          </div>
        </div>
      ) : null}
      {phase !== "idle" ? <DeviceUpdateProgress progress={progress} stage={stage} /> : null}
    </div>
  );
}
