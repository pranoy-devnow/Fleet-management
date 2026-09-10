import Link from "next/link";

import { AccountMenu } from "@/features/account/components/account-menu";
import { ACCOUNT_HOME_HREF } from "@/features/account/lib/current-user";
import { MedelaLogo } from "@/features/brand/components/medela-logo";

/**
 * Brand-yellow toolbar: lockup on the left, account menu on the right.
 *
 * Yellow is a fill colour, so the lockup stays `text-brand-ink` — white type
 * on this yellow would vanish.
 */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-yellow-dark/40 bg-brand-yellow">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-8">
        <Link href={ACCOUNT_HOME_HREF}>
          <MedelaLogo className="h-[22px] text-brand-ink" />
        </Link>
        <AccountMenu />
      </div>
    </header>
  );
}
