"use client";

import { useMemo, useState } from "react";

import { getAccountUser } from "@/features/account/lib/current-user";
import { AppShell } from "@/features/shell/app-shell";
import { BackLink } from "@/features/shell/back-link";
import { SearchableListPanel } from "@/features/shell/searchable-list-panel";
import { SegmentedControl } from "@/features/shell/segmented-control";

import { AccessRequestList } from "./access-request-list";
import { HospitalUserRow } from "./hospital-user-row";
import { MedelaUserRow } from "./medela-user-row";
import { RoleInfoTooltip } from "./role-info-tooltip";
import { useAccessRequests } from "../hooks/use-access-requests";
import { assignRole } from "../lib/assign-role";
import { admitAcceptedUser } from "../lib/decide-access-request";
import { describeViewerAccess } from "../lib/describe-viewer-access";
import { findRoleByEmail, hasPermission } from "../lib/role-permissions";
import { searchHospitalUsers, searchMedelaUsers } from "../lib/search-users";
import { listHospitalUsers, listMedelaUsers } from "../repositories/user-repository";
import type {
  HospitalUser,
  MedelaUser,
  PlatformRole,
  UserDirectoryTab,
  UserManagementSection,
} from "../types";

const DIRECTORY_LABELS: Record<UserDirectoryTab, string> = {
  medela: "Medela users",
  hospital: "Hospital staff",
};

const SEARCH_PLACEHOLDERS: Record<UserDirectoryTab, string> = {
  medela: "Search name, email, or department",
  hospital: "Search name, hospital, or country",
};

/**
 * User management for `/internal/roles`. Requests, Medela users, and hospital
 * staff are three sections behind one switch, so exactly one is on screen.
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

  const hospitalUsers = useMemo(() => listHospitalUsers(), []);
  const viewer = getAccountUser("internal");
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
  const hospitalResults = useMemo(
    () => searchHospitalUsers(hospitalUsers, query),
    [hospitalUsers, query],
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
    ["medela", DIRECTORY_LABELS.medela],
    ["hospital", DIRECTORY_LABELS.hospital],
  ];

  function onSwitchSection(next: string) {
    setSection(next as UserManagementSection);
    // A query written for one directory rarely matches the other, and a hidden
    // filter on arrival reads as an empty list.
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
          <DirectorySection
            tab={section}
            query={query}
            onQueryChange={setQuery}
            medelaResults={medelaResults}
            hospitalResults={hospitalResults}
            medelaTotal={medelaUsers.length}
            hospitalTotal={hospitalUsers.length}
            canAssign={canReviewRequests}
            onAssign={onAssign}
          />
        )}
      </div>
    </AppShell>
  );
}

function DirectorySection({
  tab,
  query,
  onQueryChange,
  medelaResults,
  hospitalResults,
  medelaTotal,
  hospitalTotal,
  canAssign,
  onAssign,
}: {
  tab: UserDirectoryTab;
  query: string;
  onQueryChange: (value: string) => void;
  medelaResults: readonly MedelaUser[];
  hospitalResults: readonly HospitalUser[];
  medelaTotal: number;
  hospitalTotal: number;
  canAssign: boolean;
  onAssign: (userId: string, role: PlatformRole) => void;
}) {
  const showingMedela = tab === "medela";
  const resultCount = showingMedela ? medelaResults.length : hospitalResults.length;
  const totalCount = showingMedela ? medelaTotal : hospitalTotal;

  return (
    <SearchableListPanel
      query={query}
      onQueryChange={onQueryChange}
      placeholder={SEARCH_PLACEHOLDERS[tab]}
      searchLabel={`Search ${DIRECTORY_LABELS[tab].toLowerCase()}`}
      listLabel={DIRECTORY_LABELS[tab]}
      announcement={`${resultCount} of ${totalCount} people match`}
      emptyMessage="Nobody matches that search."
      isEmpty={resultCount === 0}
      scroll={false}
    >
      {showingMedela
        ? medelaResults.map((user) => (
            <MedelaUserRow
              key={user.id}
              user={user}
              canAssign={canAssign}
              onAssign={(role) => onAssign(user.id, role)}
            />
          ))
        : hospitalResults.map((user) => <HospitalUserRow key={user.id} user={user} />)}
    </SearchableListPanel>
  );
}
