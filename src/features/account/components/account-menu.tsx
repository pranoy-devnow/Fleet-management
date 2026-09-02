"use client";

import { useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { AccountAvatar } from "@/features/account/components/account-avatar";
import { NotificationCount } from "@/features/account/components/notification-count";
import {
  accountProfileHref,
  accountRolesHref,
  getAccountUser,
  resolvePortalRole,
} from "@/features/account/lib/current-user";
import { PopoverSurface } from "@/features/shell/popover-surface";
import { useDismiss } from "@/features/shell/use-dismiss";
import { useAccessRequests } from "@/features/users/hooks/use-access-requests";
import {
  describeRoleNotifications,
  roleNotificationCount,
} from "@/features/users/lib/role-notification-count";
import { findRoleByEmail } from "@/features/users/lib/role-permissions";
import { listMedelaUsers } from "@/features/users/repositories/user-repository";

/**
 * Header account control: initials avatar that opens Profile and Log out.
 * Internal users also get Role management. There is no real session, so Log
 * out returns to the role picker.
 *
 * Internal Admins see a notification badge for pending access requests. Opening
 * the menu repeats that same count next to Role management so the badge has a
 * destination.
 */
export function AccountMenu() {
  const pathname = usePathname();
  const portal = resolvePortalRole(pathname);
  const user = getAccountUser(portal);
  const [open, setOpen] = useState(false);
  const rootRef = useDismiss(open, () => setOpen(false));
  const panelId = useId();
  const { requests } = useAccessRequests();

  const notificationCount = useMemo(() => {
    const platformRole = findRoleByEmail(listMedelaUsers(), user.email);
    return roleNotificationCount(portal, platformRole, requests.length);
  }, [portal, requests.length, user.email]);

  const notificationLabel =
    notificationCount > 0 ? `, ${describeRoleNotifications(notificationCount)}` : "";

  return (
    <div ref={rootRef} className="relative justify-self-end">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="menu"
        aria-label={`Account menu for ${user.name}${notificationLabel}`}
        className="relative rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <AccountAvatar initials={user.initials} />
        <NotificationCount
          count={notificationCount}
          size="lg"
          className="absolute -top-1.5 -right-1.5 ring-[3px] ring-white"
        />
      </button>

      {open ? (
        <PopoverSurface className="top-full right-0 mt-2 w-64 bg-white backdrop-blur-none">
          <div id={panelId} role="menu" aria-label="Account">
            <div className="border-b border-black/6 px-3.5 py-3">
              <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <MenuLink href={accountProfileHref(portal)} onPick={() => setOpen(false)}>
              Profile
            </MenuLink>
            {portal === "internal" ? (
              <MenuLink href={accountRolesHref(portal)} onPick={() => setOpen(false)}>
                <span>Role management</span>
                <NotificationCount count={notificationCount} />
              </MenuLink>
            ) : null}
            <div className="border-t border-black/6">
              <MenuLink href="/" onPick={() => setOpen(false)}>
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
