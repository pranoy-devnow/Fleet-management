import { CheckCircle } from "lucide-react";

import { Panel } from "@/features/shell/panel";

/**
 * Audit sign-off block shown on firmware publish/edit forms.
 * Timestamp is generated at render time for the prototype.
 */
export function SignOffCard() {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  return (
    <Panel className="mt-5 p-6">
      <h3 className="mb-1 font-semibold text-foreground">Sign-off</h3>
      <p className="mb-4 text-xs text-muted-foreground">
        By saving or publishing this release, your name will be recorded as the authorising engineer in the audit trail.
      </p>
      <div className="flex items-center gap-3 rounded-lg border border-muted bg-[#F9FAFB] px-4 py-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary">
          <span className="text-sm font-semibold text-primary-foreground">JD</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-foreground">Jane Doe</div>
          <div className="text-xs text-muted-foreground">jane.doe@medela.com · Clinical Engineering</div>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-[#13985A]">
          <CheckCircle size={12} />
          Authorised
        </div>
      </div>
      <p className="mt-3 text-xs text-[#9CA3AF]">
        Sign-off timestamp will be recorded as:{" "}
        <span className="font-mono">{timestamp} UTC</span>
      </p>
    </Panel>
  );
}
