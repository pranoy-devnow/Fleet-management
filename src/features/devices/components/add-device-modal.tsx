"use client";

import { useId, useMemo, useState } from "react";
import { X } from "lucide-react";

import { DeviceLocationStep } from "@/features/devices/components/device-location-step";
import { NewDeviceDetailsStep } from "@/features/devices/components/new-device-details-step";
import { listDeviceCountries } from "@/features/devices/repositories/device-repository";
import type { AddDeviceResult } from "@/features/devices/lib/add-device";
import { addDeviceSchema, type AddDeviceInput } from "@/features/devices/schemas";
import type { DeviceCountry } from "@/features/devices/types";
import { ModalOverlay } from "@/features/shell/modal-overlay";
import { Panel } from "@/features/shell/panel";
import { parseFormData } from "@/lib/parse-form";

const DUPLICATE_SERIAL_MESSAGE = "That serial is already registered to your account";

type AddDeviceStep = "location" | "details";

/**
 * Two-step dialog for adding another device to the signed-in biomed's account:
 * where the device is, then what it is.
 *
 * It mirrors registration step for step so the flow is recognisable, minus the
 * account fields — this account already exists.
 *
 * @param onAdd - Registers the device; a duplicate serial comes back as a failure to show
 * @param onClose - Closes the dialog, from the close button, Escape, or an outside press
 */
export function AddDeviceModal({
  onAdd,
  onClose,
}: {
  onAdd: (input: AddDeviceInput) => AddDeviceResult;
  onClose: () => void;
}) {
  const countries = useMemo(() => listDeviceCountries(), []);
  const [step, setStep] = useState<AddDeviceStep>("location");
  const [country, setCountry] = useState<DeviceCountry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = parseFormData(new FormData(event.currentTarget), addDeviceSchema);
    if (!parsed.ok) {
      setError(parsed.message);
      return;
    }

    const result = onAdd(parsed.data);
    if (!result.ok) {
      setError(DUPLICATE_SERIAL_MESSAGE);
      return;
    }

    onClose();
  }

  return (
    <ModalOverlay labelledBy={titleId} onDismiss={onClose}>
      <Panel className="relative p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-black/6 text-foreground transition-colors hover:bg-black/12 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
          aria-label="Close add device"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {step === "details" && country ? (
          <NewDeviceDetailsStep
            country={country}
            error={error}
            titleId={titleId}
            onBack={() => {
              setError(null);
              setStep("location");
            }}
            onSubmit={onSubmit}
          />
        ) : (
          <DeviceLocationStep
            countries={countries}
            selected={country}
            onSelect={setCountry}
            onNext={() => setStep("details")}
            titleId={titleId}
          />
        )}
      </Panel>
    </ModalOverlay>
  );
}
