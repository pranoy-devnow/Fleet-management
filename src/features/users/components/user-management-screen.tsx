"use client";

import { useMemo, useState } from "react";

import { getAccountUser } from "@/features/account/lib/current-user";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { SearchableListPanel } from "@/features/shell/searchable-list-panel";
import { SegmentedControl } from "@/features/shell/segmented-control";

import { AccessRequestList } from "./access-request-list";
import { MedelaUserRow } from "./medela-user-row";
import { RoleInfoTooltip } from "./role-info-tooltip";
import { useAccessRequests } from "../hooks/use-access-requests";
import { assignRole } from "../lib/assign-role";
import { admitAcceptedUser } from "../lib/decide-access-request";
import { describeViewerAccess } from "../lib/describe-viewer-access";
import { findRoleByEmail, hasPermission } from "../lib/role-permissions";
import { searchMedelaUsers } from "../lib/search-users";
import { listMedelaUsers } from "../repositories/user-repository";
import type { MedelaUser, PlatformRole, UserManagementSection } from "../types";

const MEDELA_DIRECTORY_LABEL = "Medela users";
const MEDELA_SEARCH_PLACEHOLDER = "Search name, email, or department";

/**
 * User management for `/internal/roles`. Requests and Medela users are two
 * sections behind one switch, so exactly one is on screen.
 *
 * All state is local. Nothing here enforces the permissions it describes —
 * gating routes needs a real session, which the prototype does not have.
 *
 * @param homeHref - Where the back link returns
 */
export function UserManagementScreen({ homeHref }: { homeHref: string }) {
  const [medelaUsers, setMedelaUsers] = useState<MedelaUser[]>(listMedelaUsers);
  const { requests, decide } = useAccessRequests();
  const [query, setQuery] = useState("");

  const viewer = getAccountUser();
  const viewerRole = findRoleByEmail(medelaUsers, viewer.email);
  const canReviewRequests = hasPermission(viewerRole, "requests:review");

  // An admin's first job here is the queue waiting on them; everyone else has
  // no requests section to land on.
  const [section, setSection] = useState<UserManagementSection>(
    canReviewRequests ? "requests" : "medela",
  );

  const medelaResults = useMemo(
    () => searchMedelaUsers(medelaUsers, query),
    [medelaUsers, query],
  );

  const sectionOptions: ReadonlyArray<readonly [UserManagementSection, string]> = [
    ...(canReviewRequests
      ? ([
          [
            "requests",
            requests.length > 0 ? `Requests (${requests.length})` : "Requests",
          ],
        ] as const)
      : []),
    ["medela", MEDELA_DIRECTORY_LABEL],
  ];

  function onSwitchSection(next: string) {
    setSection(next as UserManagementSection);
    // A query written for the directory should not hide the requests list.
    setQuery("");
  }

  function onAssign(userId: string, role: PlatformRole) {
    setMedelaUsers((current) => assignRole(current, userId, role));
  }

  function onDecideRequest(requestId: string, decision: "accepted" | "rejected") {
    const accepted = decide(requestId, decision);
    if (accepted === null) return;
    setMedelaUsers((current) => admitAcceptedUser(current, accepted));
  }

  return (
    <AppShell title="User management" subtitle={describeViewerAccess(viewerRole)}>
      <BackLink href={homeHref} label="Overview" />

      <div className="flex max-w-3xl flex-col gap-4">
        <div className="flex items-center gap-2">
          <SegmentedControl
            value={section}
            onChange={onSwitchSection}
            options={sectionOptions}
            label="Section"
          />
          <RoleInfoTooltip />
        </div>

        {section === "requests" ? (
          <AccessRequestList requests={requests} onDecide={onDecideRequest} />
        ) : (
          <MedelaDirectory
            query={query}
            onQueryChange={setQuery}
            results={medelaResults}
            total={medelaUsers.length}
            canAssign={canReviewRequests}
            onAssign={onAssign}
          />
        )}
      </div>
    </AppShell>
  );
}

function MedelaDirectory({
  query,
  onQueryChange,
  results,
  total,
  canAssign,
  onAssign,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  results: readonly MedelaUser[];
  total: number;
  canAssign: boolean;
  onAssign: (userId: string, role: PlatformRole) => void;
}) {
  return (
    <SearchableListPanel
      query={query}
      onQueryChange={onQueryChange}
      placeholder={MEDELA_SEARCH_PLACEHOLDER}
      searchLabel={`Search ${MEDELA_DIRECTORY_LABEL.toLowerCase()}`}
      listLabel={MEDELA_DIRECTORY_LABEL}
      announcement={`${results.length} of ${total} people match`}
      emptyMessage="Nobody matches that search."
      isEmpty={results.length === 0}
      scroll={false}
    >
      {results.map((user) => (
        <MedelaUserRow
          key={user.id}
          user={user}
          canAssign={canAssign}
          onAssign={(role) => onAssign(user.id, role)}
        />
      ))}
    </SearchableListPanel>
  );
}
