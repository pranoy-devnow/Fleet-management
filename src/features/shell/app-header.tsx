"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { AccountMenu } from "@/features/account/components/account-menu";
import { BrandMark } from "@/features/shell/brand-mark";
import { HeaderSearch } from "@/features/shell/header-search";

/**
 * Frosted Apple-style toolbar with a centered search pill.
 */
export function AppHeader() {
  const pathname = usePathname();
  const homeHref = pathname.startsWith("/biomed") ? "/biomed" : "/internal";

  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-[#F5F6F8]/80 backdrop-blur-xl">
      <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-[1fr_minmax(12rem,28rem)_1fr] items-center gap-4 px-8">
        <Link href={homeHref} className="flex items-center gap-2 justify-self-start">
          <BrandMark size="sm" />
          <span className="text-[15px] font-semibold tracking-tight text-foreground">Medela</span>
        </Link>
        <HeaderSearch />
        <AccountMenu />
      </div>
    </header>
  );
}
