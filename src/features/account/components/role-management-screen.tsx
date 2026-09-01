import { ACCOUNT_USERS } from "@/features/account/data/users";
import { accountHomeHref, getAccountUser } from "@/features/account/lib/current-user";
import type { PortalRole } from "@/features/account/types";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { GroupedList, GroupedListRow } from "@/features/shell/grouped-list";

const ROLE_ORDER: readonly PortalRole[] = ["internal", "biomed"];

const ROLE_SUMMARIES: Record<PortalRole, string> = {
  internal: "Staff access — device fleet and firmware",
  biomed: "Hospital access — assigned devices and updates",
};

/**
 * Lists the two portal roles and lets the prototype switch between them.
 *
 * Switching has no session: it just navigates to the other portal home.
 *
 * @param role - Portal the user is currently in
 * @param homeHref - Where the back link returns
 */
export function RoleManagementScreen({
  role,
  homeHref,
}: {
  role: PortalRole;
  homeHref: string;
}) {
  const user = getAccountUser(role);

  return (
    <AppShell title="Role management" subtitle={`Signed in as ${user.roleLabel}`}>
      <BackLink href={homeHref} label="Overview" />
      <div className="max-w-xl">
        <GroupedList footer="Switching roles opens the other portal. There is no real session.">
          {ROLE_ORDER.map((option) => {
            const current = option === role;
            const fixture = ACCOUNT_USERS[option];
            return (
              <GroupedListRow
                key={option}
                href={current ? accountHomeHref(role) : accountHomeHref(option)}
                title={fixture.roleLabel}
                subtitle={ROLE_SUMMARIES[option]}
                trailing={
                  current ? (
                    <span className="text-xs font-medium text-primary">Current</span>
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground">Switch</span>
                  )
                }
              />
            );
          })}
        </GroupedList>
      </div>
    </AppShell>
  );
}
