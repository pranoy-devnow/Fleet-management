"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AmberCallout } from "@/features/shell/amber-callout";
import { AuthShell } from "@/features/shell/auth-shell";
import { FormField } from "@/features/shell/form-field";
import { NativeSelect } from "@/features/shell/native-select";

/**
 * First-time Medela account form. Prototype: Create Account continues with empty fields.
 */
export function MedelaRegisterForm() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/internal");
  }

  return (
    <AuthShell>
      <h2 className="mb-1 text-xl font-bold text-foreground">Create Account</h2>
      <p className="mb-5 text-sm text-muted-foreground">Register your Medela internal account</p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <AmberCallout>Open question: is account creation self-serve or admin-provisioned?</AmberCallout>
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
        <Button type="submit" className="mt-1 h-auto w-full rounded-[6px] py-2.5">Create Account</Button>
        <p className="text-center text-xs text-[#9CA3AF]">Prototype — credentials not required</p>
      </form>
    </AuthShell>
  );
}
