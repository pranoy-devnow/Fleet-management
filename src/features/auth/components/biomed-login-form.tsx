"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { AuthHeading } from "@/features/shell/auth-heading";
import { AuthShell } from "@/features/shell/auth-shell";
import { FormField } from "@/features/shell/form-field";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";

/**
 * Hospital biomed sign-in. Prototype: Sign In continues with empty fields.
 */
export function BiomedLoginForm() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/biomed");
  }

  return (
    <AuthShell>
      <AuthHeading
        title="Biomed / Hospital Staff"
        subtitle="Sign in to manage your assigned devices"
      />
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <FormField label="Username" name="username" placeholder="dr.rossi" />
        <FormField label="Password" name="password" type="password" placeholder="••••••••" />
        <PrimaryActionButton type="submit" className="mt-2 w-full">
          Sign In
        </PrimaryActionButton>
        <div className="text-center">
          <Link href="/register/biomed" className="text-sm font-semibold text-primary hover:underline">
            First time? Register while registering your device
          </Link>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Prototype — credentials not required
        </p>
      </form>
    </AuthShell>
  );
}
