"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAssignedDevices } from "@/features/devices/hooks/use-assigned-devices";
import { ConfirmDialog } from "@/features/shell/confirm-dialog";
import { cn } from "@/lib/utils";

const MISSING_DEVICE_MESSAGE = "That device is no longer on your account. Nothing was removed.";

/**
 * Removes one device from the biomed's account, behind a confirmation step.
 *
 * On success it returns to the device list, because the page it sits on is
 * about a device that no longer exists.
 *
 * @param deviceId - Serial of the device the surrounding page is showing
 * @param className - Positions the button within its row, e.g. `ml-auto`
 */
export function RemoveDeviceButton({
  deviceId,
  className,
}: {
  deviceId: string;
  className?: string;
}) {
  const router = useRouter();
  const { remove } = useAssignedDevices();
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onConfirm() {
    const result = remove(deviceId);
    if (!result.ok) {
      setError(MISSING_DEVICE_MESSAGE);
      return;
    }

    router.push("/biomed");
  }

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        onClick={() => setIsConfirming(true)}
        className={cn("h-auto rounded-[6px] px-5 py-2.5", className)}
      >
        <Trash2 size={14} className="mr-1.5" />
        Remove device
      </Button>

      {isConfirming ? (
        <ConfirmDialog
          title={`Remove ${deviceId}?`}
          description="This device will be removed from your account and stop appearing in your device list. You can register it again later with the same serial number."
          confirmLabel="Remove device"
          error={error}
          onConfirm={onConfirm}
          onCancel={() => {
            setError(null);
            setIsConfirming(false);
          }}
        />
      ) : null}
    </>
  );
}
