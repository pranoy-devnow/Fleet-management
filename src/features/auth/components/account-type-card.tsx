import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

/**
 * One account type on the entry screen. The whole card is the control: it
 * navigates to that portal's existing sign-in page, so there is no separate
 * "continue" step after choosing.
 *
 * Styled for the white picker card — yellow hover is the only brand accent.
 *
 * @param icon - Lucide icon shown in the card's tile
 * @param title - Account type as the person picking it would name it
 * @param description - What access the account grants
 * @param href - Sign-in path for this account type
 */
export function AccountTypeCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group/option flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-brand-yellow hover:bg-brand-yellow-tint focus-visible:ring-3 focus-visible:ring-brand-teal/40"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-brand-slate transition-colors group-hover/option:bg-brand-yellow group-hover/option:text-brand-ink">
        <Icon size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <ChevronRight
        size={18}
        className="shrink-0 text-brand-slate/40 transition-colors group-hover/option:text-brand-ink"
      />
    </Link>
  );
}
