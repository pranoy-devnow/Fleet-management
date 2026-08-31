import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Mock email client showing the Biomed notification after a firmware publish.
 */
export function EmailPreview() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E8ECF3] p-4">
      <div className="w-full max-w-2xl">
        <Link href="/internal" className="mb-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 rounded-t-xl border border-border bg-[#F1F3F4] p-3">
          <div className="mr-2 flex gap-1.5">
            <div className="size-3 rounded-full bg-[#FF5F57]" />
            <div className="size-3 rounded-full bg-[#FEBC2E]" />
            <div className="size-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">New firmware available — v2.4.0</span>
        </div>
        <div className="rounded-b-xl border-x border-b border-border bg-white shadow-md">
          <div className="border-b border-muted px-6 py-4">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex gap-3">
                <span className="w-14 text-[#9CA3AF]">From</span>
                <span className="font-medium text-foreground">Kingfisher Fleet &lt;no-reply@medela.com&gt;</span>
              </div>
              <div className="flex gap-3">
                <span className="w-14 text-[#9CA3AF]">To</span>
                <span className="text-foreground">bioeng@charite.de</span>
              </div>
              <div className="flex gap-3">
                <span className="w-14 text-[#9CA3AF]">Subject</span>
                <span className="font-semibold text-foreground">New firmware available — v2.4.0</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-6">
            <p className="mb-3 text-sm text-foreground">Hi Dr. Rossi,</p>
            <p className="mb-3 text-sm leading-relaxed text-[#374151]">
              A new firmware update (v2.4.0) has been published for the Medela Freestyle Hands-free devices in your care at Charité. The following devices assigned to you are eligible for this update:
            </p>
            <ul className="mb-4 ml-2 list-inside list-disc space-y-1 text-sm text-[#374151]">
              <li>KF-2024-00931 — NICU Ward 3 (Needs Update)</li>
              <li>KF-2023-00512 — NICU Ward 3 (Failed Update)</li>
            </ul>
            <p className="mb-6 text-sm leading-relaxed text-[#374151]">
              Please sign in to the Kingfisher Fleet Portal to review and apply the update at your earliest convenience.
            </p>
            <Button render={<Link href="/login/biomed" />} className="h-auto rounded-[6px] px-5 py-2.5">
              Sign In &amp; Update Now
            </Button>
            <p className="mt-6 text-xs text-[#9CA3AF]">
              Kingfisher Fleet Management Portal · Medela AG · Theilerstrasse 1, 6300 Zug, Switzerland
              <br />
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Biomed opens the link → signs in → lands on Device Detail &amp; Update
        </p>
      </div>
    </div>
  );
}
