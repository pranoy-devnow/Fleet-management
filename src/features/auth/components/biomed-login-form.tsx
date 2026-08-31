"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/shell/auth-shell";
import { FormField } from "@/features/shell/form-field";

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
      <h2 className="mb-1 text-xl font-bold text-foreground">Biomed / Hospital Staff</h2>
      <p className="mb-6 text-sm text-muted-foreground">Sign in to manage your assigned devices</p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <FormField label="Username" name="username" placeholder="dr.rossi" />
        <FormField label="Password" name="password" type="password" placeholder="••••••••" />
        <Button type="submit" className="mt-1 h-auto w-full rounded-[6px] py-2.5">Sign In</Button>
        <div className="text-center">
          <Link href="/register/biomed" className="text-sm text-primary hover:underline">
            First time? Register while registering your device
          </Link>
        </div>
        <p className="mt-2 text-center text-xs text-[#9CA3AF]">Prototype — credentials not required</p>
      </form>
    </AuthShell>
  );
}
