"use client";

import { useId, useState } from "react";
import Link from "next/link";

import { AccountAvatar } from "@/features/account/components/account-avatar";
import {
  ACCOUNT_PROFILE_HREF,
  SIGN_OUT_HREF,
  getAccountUser,
} from "@/features/account/lib/current-user";
import { PopoverSurface } from "@/features/shell/popover-surface";
import { useDismiss } from "@/features/shell/use-dismiss";

/**
 * Header account control: initials avatar that opens Profile and Log out.
 * There is no real session, so Log out returns to Medela sign-in.
 */
export function AccountMenu() {
  const user = getAccountUser();
  const [open, setOpen] = useState(false);
  const rootRef = useDismiss(open, () => setOpen(false));
  const panelId = useId();

  return (
    <div ref={rootRef} className="relative justify-self-end">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="menu"
        aria-label={`Account menu for ${user.name}`}
        className="relative rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <AccountAvatar initials={user.initials} />
      </button>

      {open ? (
        <PopoverSurface className="top-full right-0 mt-2 w-64 bg-white backdrop-blur-none">
          <div id={panelId} role="menu" aria-label="Account">
            <div className="border-b border-black/6 px-3.5 py-3">
              <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <MenuLink href={ACCOUNT_PROFILE_HREF} onPick={() => setOpen(false)}>
              Profile
            </MenuLink>
            <div className="border-t border-black/6">
              <MenuLink href={SIGN_OUT_HREF} onPick={() => setOpen(false)}>
                Log out
              </MenuLink>
            </div>
          </div>
        </PopoverSurface>
      ) : null}
    </div>
  );
}

function MenuLink({
  href,
  onPick,
  children,
}: {
  href: string;
  onPick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onPick}
      className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm text-foreground hover:bg-black/4"
    >
      {children}
    </Link>
  );
}
