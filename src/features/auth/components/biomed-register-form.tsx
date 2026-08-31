"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AmberCallout } from "@/features/shell/amber-callout";
import { AuthShell } from "@/features/shell/auth-shell";
import { FormField } from "@/features/shell/form-field";
import { NativeSelect } from "@/features/shell/native-select";

/**
 * Combined biomed account + first-device registration.
 * Prototype: Register continues with empty fields.
 */
export function BiomedRegisterForm() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/biomed/welcome");
  }

  return (
    <AuthShell>
      <h2 className="mb-1 text-xl font-bold text-foreground">Register Device &amp; Account</h2>
      <p className="mb-5 text-sm text-muted-foreground">Create your account and register your device</p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <AmberCallout>Open question: one Biomed account per device, or many devices per Biomed?</AmberCallout>
        <FormField label="Full name" name="fullName" placeholder="Dr. Marco Rossi" />
        <FormField label="Email" name="email" type="email" placeholder="bioeng@charite.de" />
        <FormField label="Phone" name="phone" type="tel" placeholder="+49 30 450 5000" />
        <FormField label="Hospital / Facility" name="hospital" placeholder="Charité Universitätsmedizin" />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Device serial number" name="serial" placeholder="KF-2024-01234" />
          <NativeSelect
            label="Model"
            name="model"
            defaultValue=""
            options={[
              ["", "Select model…"],
              ["Freestyle Hands-free", "Freestyle Hands-free"],
              ["Symphony", "Symphony"],
              ["Swing Maxi", "Swing Maxi"],
            ]}
          />
        </div>
        <FormField label="Password" name="password" type="password" placeholder="••••••••" />
        <Button type="submit" className="mt-1 h-auto w-full rounded-[6px] py-2.5">
          Register Device &amp; Create Account
        </Button>
        <p className="text-center text-xs text-[#9CA3AF]">Prototype — credentials not required</p>
      </form>
    </AuthShell>
  );
}
