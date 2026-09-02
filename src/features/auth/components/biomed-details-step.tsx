"use client";

import { ArrowLeft, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthStepHeading } from "@/features/auth/components/auth-step-heading";
import type { DeviceCountry } from "@/features/devices/types";
import { FormField } from "@/features/shell/form-field";
import { NativeSelect } from "@/features/shell/native-select";

const MODEL_OPTIONS: Array<[string, string]> = [
  ["", "Select model…"],
  ["Freestyle Hands-free", "Freestyle Hands-free"],
  ["Symphony", "Symphony"],
  ["Swing Maxi", "Swing Maxi"],
];

/**
 * Second registration step: account and device details for an already-chosen
 * country.
 *
 * @param country - Country picked in step one, shown read-only with a way back
 * @param onBack - Returns to the location step so the choice can be changed
 * @param onSubmit - Form submit handler
 */
export function BiomedDetailsStep({
  country,
  onBack,
  onSubmit,
}: {
  country: DeviceCountry;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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

      <AuthStepHeading
        step={2}
        title="Your details"
        subtitle="Create your account and register the device"
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
        <FormField label="Full name" name="fullName" placeholder="Dr. Marco Rossi" />
        <FormField label="Email" name="email" type="email" placeholder="bioeng@charite.de" />
        <FormField label="Phone" name="phone" type="tel" placeholder="+49 30 450 5000" />
        <FormField
          label="Hospital / Facility"
          name="hospital"
          placeholder="Charité Universitätsmedizin"
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Device serial number" name="serial" placeholder="KF-2024-01234" />
          <NativeSelect label="Model" name="model" defaultValue="" options={MODEL_OPTIONS} />
        </div>
        <FormField label="Password" name="password" type="password" placeholder="••••••••" />
        <Button type="submit" className="mt-1 h-auto w-full rounded-[6px] py-2.5">
          Register Device &amp; Create Account
        </Button>
      </form>
    </div>
  );
}
