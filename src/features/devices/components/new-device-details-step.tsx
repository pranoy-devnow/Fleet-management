"use client";

import { ArrowLeft, MapPin } from "lucide-react";

import { BIOMED_HOSPITAL, DEVICE_MODEL_CHOICES } from "@/features/devices/constants";
import type { DeviceCountry } from "@/features/devices/types";
import { FormField } from "@/features/shell/form-field";
import { NativeSelect } from "@/features/shell/native-select";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";
import { StepHeading } from "@/features/shell/step-heading";

/**
 * Second step of adding a device to an existing account: the device itself.
 *
 * No personal or account fields — the biomed is already signed in, so the
 * hospital is shown read-only rather than asked for again.
 *
 * @param country - Country picked in step one, shown read-only with a way back
 * @param error - Message from a rejected submit, e.g. a serial already registered
 * @param onBack - Returns to the location step so the choice can be changed
 * @param onSubmit - Form submit handler
 * @param titleId - Optional id for the heading, so a dialog can label itself with it
 */
export function NewDeviceDetailsStep({
  country,
  error,
  onBack,
  onSubmit,
  titleId,
}: {
  country: DeviceCountry;
  error: string | null;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleId?: string;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={15} />
        Change country
      </button>

      <StepHeading
        step={2}
        title="Device details"
        subtitle="Tell us which unit you are adding and where it sits"
        titleId={titleId}
      />

      <div className="mb-5 flex items-center gap-3 rounded-xl bg-black/[0.03] px-4 py-3">
        <MapPin size={16} className="shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{country.country}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{country.regionLabel}</p>
        </div>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        {/* Carries the step-one choice into the submitted form data. */}
        <input type="hidden" name="country" value={country.country} />

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-foreground">Hospital / Facility</span>
          <p className="text-sm text-muted-foreground">
            {BIOMED_HOSPITAL} — from your account
          </p>
        </div>

        <FormField label="Device serial number" name="serial" placeholder="KF-2024-01234" />
        <NativeSelect label="Model" name="model" defaultValue="" options={DEVICE_MODEL_CHOICES} />
        <FormField label="Ward" name="ward" placeholder="NICU Ward 4" />

        {error ? (
          <p role="alert" className="text-sm font-medium text-status-failed">
            {error}
          </p>
        ) : null}

        <PrimaryActionButton type="submit" className="mt-2 w-full">
          Add device
        </PrimaryActionButton>
      </form>
    </div>
  );
}
