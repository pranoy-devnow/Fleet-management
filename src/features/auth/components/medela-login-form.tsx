"use client";

import { useRouter } from "next/navigation";

import { MicrosoftMark } from "@/features/auth/components/microsoft-mark";
import { AuthHeading } from "@/features/shell/auth-heading";
import { AuthShell } from "@/features/shell/auth-shell";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";

/**
 * Azure AD SSO sign-in. Prototype: the Microsoft button continues with no
 * Entra handshake, so the card can be reviewed before identity is wired.
 */
export function MedelaLoginForm() {
  const router = useRouter();

  function onSignIn() {
    router.push("/internal");
  }

  return (
    <AuthShell>
      <AuthHeading title="Sign in" subtitle="Use your official email to sign in." />
      <PrimaryActionButton type="button" className="w-full gap-3" onClick={onSignIn}>
        <MicrosoftMark className="size-5" />
        Sign in with Microsoft
      </PrimaryActionButton>
    </AuthShell>
  );
}
