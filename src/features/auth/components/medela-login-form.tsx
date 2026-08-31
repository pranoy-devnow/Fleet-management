"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/features/shell/auth-shell";
import { FormField } from "@/features/shell/form-field";

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
      <h2 className="mb-1 text-xl font-bold text-foreground">Medela Internal</h2>
      <p className="mb-6 text-sm text-muted-foreground">Sign in with your Medela work account</p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <FormField label="Work email" name="email" type="email" placeholder="name@medela.com" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-semibold text-foreground">Password</Label>
            <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
          </div>
          <Input id="password" name="password" type="password" placeholder="••••••••" className="h-auto rounded-[6px] bg-white px-3 py-2.5" />
        </div>
        <Button type="submit" className="mt-1 h-auto w-full rounded-[6px] py-2.5">Sign In</Button>
        <div className="text-center">
          <Link href="/register/medela" className="text-sm text-primary hover:underline">First time here? Register</Link>
        </div>
        <p className="mt-2 text-center text-xs text-[#9CA3AF]">Prototype — credentials not required</p>
      </form>
    </AuthShell>
  );
}
