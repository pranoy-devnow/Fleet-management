import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Panel } from "@/features/shell/panel";
import { cn } from "@/lib/utils";

/**
 * Settings-style grouped list surface.
 */
export function GroupedList({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Panel className="overflow-hidden">
      <div className="divide-y divide-black/6">{children}</div>
      {footer ? <div className="border-t border-black/6 px-5 py-3 text-xs text-muted-foreground">{footer}</div> : null}
    </Panel>
  );
}

/**
 * Full-row hit target: title, secondary line, trailing chip, chevron.
 */
export function GroupedListRow({
  href,
  title,
  subtitle,
  trailing,
}: {
  href: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-black/[0.03]",
      )}
    >
      <div className="min-w-0">
        <div className="text-[15px] font-semibold tracking-tight text-foreground">{title}</div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {trailing}
        <ChevronRight size={16} className="text-muted-foreground/60" />
      </div>
    </Link>
  );
}

/**
 * Empty grouped-list placeholder.
 */
export function GroupedListEmpty({ children }: { children: React.ReactNode }) {
  return <p className="px-5 py-12 text-center text-sm text-muted-foreground">{children}</p>;
}
