import { AccountAvatar } from "@/features/account/components/account-avatar";
import { getAccountUser } from "@/features/account/lib/current-user";
import type { PortalRole } from "@/features/account/types";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { Panel } from "@/features/shell/panel";

/**
 * Read-only profile for the prototype signed-in user.
 *
 * @param role - Portal whose fixture user is shown
 * @param homeHref - Where the back link returns
 */
export function ProfileScreen({ role, homeHref }: { role: PortalRole; homeHref: string }) {
  const user = getAccountUser(role);

  return (
    <AppShell title="Profile" subtitle="Your account details for this portal">
      <BackLink href={homeHref} label="Overview" />
      <div className="max-w-xl">
        <Panel className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <AccountAvatar initials={user.initials} size="lg" />
            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold text-foreground">{user.name}</h2>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="divide-y divide-muted">
            {(
              [
                ["Name", user.name],
                ["Email", user.email],
                ["Role", user.roleLabel],
                ["Organization", user.organization],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="flex gap-4 py-3">
                <span className="w-44 shrink-0 text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
