"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { AccountMenu } from "@/features/account/components/account-menu";
import { MedelaLogo } from "@/features/brand/components/medela-logo";
import { HeaderSearch } from "@/features/shell/header-search";

/**
 * Brand-yellow toolbar with a centered search pill.
 *
 * Yellow is a fill colour, so the lockup stays `text-brand-ink` — white type
 * on this yellow would vanish.
 */
export function AppHeader() {
  const pathname = usePathname();
  const homeHref = pathname.startsWith("/biomed") ? "/biomed" : "/internal";

  return (
    <header className="sticky top-0 z-40 border-b border-brand-yellow-dark/40 bg-brand-yellow">
      <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-[1fr_minmax(12rem,28rem)_1fr] items-center gap-4 px-8">
        <Link href={homeHref} className="justify-self-start">
          <MedelaLogo className="h-[22px] text-brand-ink" />
        </Link>
        <HeaderSearch />
        <AccountMenu />
      </div>
    </header>
  );
}
