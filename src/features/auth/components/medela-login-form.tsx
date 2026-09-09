"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthHeading } from "@/features/shell/auth-heading";
import { AuthShell } from "@/features/shell/auth-shell";
import { FormField } from "@/features/shell/form-field";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";

/**
 * Medela staff sign-in. Prototype: Sign In continues with empty fields.
 */
export function MedelaLoginForm() {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/internal");
  }

  return (
    <AuthShell>
      <AuthHeading title="Medela Internal" subtitle="Sign in with your Medela work account" />
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <FormField label="Work email" name="email" type="email" placeholder="name@medela.com" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-semibold text-foreground">
              Password
            </Label>
            <button type="button" className="text-xs text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="h-auto rounded-[6px] bg-white px-3 py-2.5"
          />
        </div>
        <PrimaryActionButton type="submit" className="mt-2 w-full">
          Sign In
        </PrimaryActionButton>
        <div className="text-center">
          <Link href="/register/medela" className="text-sm font-semibold text-primary hover:underline">
            First time here? Register
          </Link>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Prototype — credentials not required
        </p>
      </form>
    </AuthShell>
  );
}
