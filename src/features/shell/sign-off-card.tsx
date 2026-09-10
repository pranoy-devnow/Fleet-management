import { CheckCircle } from "lucide-react";

import { Panel } from "@/features/shell/panel";

/** Person shown in the firmware sign-off / uploaded-by card. */
export type SignOffPerson = {
  name: string;
  initials: string;
  detail?: string;
};

/**
 * Attribution card under a firmware form or a published release.
 *
 * @param title - Heading, e.g. Sign-off or Uploaded by
 * @param description - One line on what this record means
 * @param person - Who is attributed
 * @param badge - Short status on the person row
 * @param footer - Optional timestamp or extra note
 */
export function SignOffCard({
  title,
  description,
  person,
  badge,
  footer,
}: {
  title: string;
  description: string;
  person: SignOffPerson;
  badge: string;
  footer?: React.ReactNode;
}) {
  return (
    <Panel className="mt-5 p-6">
      <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
      <p className="mb-4 text-xs text-muted-foreground">{description}</p>
      <div className="flex items-center gap-3 rounded-lg border border-muted bg-muted px-4 py-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary">
          <span className="text-sm font-semibold text-primary-foreground">{person.initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-foreground">{person.name}</div>
          {person.detail ? (
            <div className="text-xs text-muted-foreground">{person.detail}</div>
          ) : null}
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-status-updated/25 bg-status-updated-tint px-2.5 py-1 text-xs font-medium text-status-updated">
          <CheckCircle size={12} />
          {badge}
        </div>
      </div>
      {footer ? <p className="mt-3 text-xs text-muted-foreground">{footer}</p> : null}
    </Panel>
  );
}
