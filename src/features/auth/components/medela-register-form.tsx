"use client";

import { useRouter } from "next/navigation";

import { AuthHeading } from "@/features/shell/auth-heading";
import { AuthShell } from "@/features/shell/auth-shell";
import { FormField } from "@/features/shell/form-field";
import { NativeSelect } from "@/features/shell/native-select";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";

/**
 * First-time Medela access request. Prototype: the button continues with empty fields.
 */
export function MedelaRegisterForm() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/internal");
  }

  return (
    <AuthShell>
      <AuthHeading title="Create Account" subtitle="Register your Medela internal account" />
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <FormField label="Full name" name="fullName" placeholder="Sarah Chen" />
        <FormField label="Work email" name="email" type="email" placeholder="name@medela.com" />
        <NativeSelect
          label="Role / Department"
          name="department"
          defaultValue=""
          options={[
            ["", "Select department…"],
            ["Clinical Engineering", "Clinical Engineering"],
            ["Product Management", "Product Management"],
            ["Field Service", "Field Service"],
            ["IT / Infrastructure", "IT / Infrastructure"],
          ]}
        />
        <FormField label="Password" name="password" type="password" placeholder="••••••••" />
        <PrimaryActionButton type="submit" className="mt-2 w-full">
          Request for Access
        </PrimaryActionButton>
      </form>
    </AuthShell>
  );
}
