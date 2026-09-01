"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { BiomedDetailsStep } from "@/features/auth/components/biomed-details-step";
import { DeviceLocationStep } from "@/features/auth/components/device-location-step";
import { listDeviceCountries } from "@/features/devices/repositories/device-repository";
import type { DeviceCountry } from "@/features/devices/types";
import { AuthShell } from "@/features/shell/auth-shell";

type RegisterStep = "location" | "details";

/**
 * Two-step biomed registration: choose the device's country, then fill in
 * account and device details.
 *
 * Location comes first because it scopes everything after it, and picking from
 * the countries the fleet already operates in beats free-typing one.
 *
 * Prototype: Register continues with empty fields.
 */
export function BiomedRegisterForm() {
  const router = useRouter();
  const countries = useMemo(() => listDeviceCountries(), []);
  const [step, setStep] = useState<RegisterStep>("location");
  const [country, setCountry] = useState<DeviceCountry | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/biomed/welcome");
  }

  return (
    <AuthShell>
      {step === "details" && country ? (
        <BiomedDetailsStep
          country={country}
          onBack={() => setStep("location")}
          onSubmit={onSubmit}
        />
      ) : (
        <DeviceLocationStep
          countries={countries}
          selected={country}
          onSelect={setCountry}
          onNext={() => setStep("details")}
        />
      )}
    </AuthShell>
  );
}
