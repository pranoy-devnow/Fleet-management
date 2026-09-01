# Users

User management for `/internal/roles`: two searchable directories, Admin-only role assignment, and access-request review.

Managing other people is a separate concern from [`features/account`](../account/README.md), which is only ever about the signed-in user.

## Permission model

Two roles, three permissions. Roles are named after real responsibilities; the raw permission keys are never shown to an admin.

| Role  | Grants                                                              |
| ----- | ------------------------------------------------------------------- |
| Admin | `requests:review` — accept or reject platform access requests        |
| IT    | `overview:view`, `firmware:upload` — see the fleet, upload firmware  |

The roles are **disjoint**: Admin is not a superset of IT. Change `ROLE_PERMISSIONS` in `constants.ts` if that ever stops being true — nothing else hard-codes the mapping.

## Sections

Requests, Medela users, and Hospital staff are three sections behind one `SegmentedControl`, and exactly one is on screen at a time. Requests appears only for viewers holding `requests:review`, and is where an admin lands, since the queue is waiting on them. Its tab label carries the pending count.

## How to use

- `UserManagementScreen` owns section, query, and user-list state. `/internal/roles` renders it. The subtitle names the viewer's access (`You have Admin access`).
- Pending access requests live in `accessRequestStore` so the header badge and this screen share one queue.
- `listMedelaUsers`, `listHospitalUsers`, `listAccessRequests` return sorted copies, so callers can hold them in state.
- `searchMedelaUsers` / `searchHospitalUsers` — free-text narrowing, blank query returns everyone
- `assignRole(users, userId, role)` — immutable, returns a new array
- `permissionsForRole`, `hasPermission`, `findRoleByEmail` — the viewer's rights. `findRoleByEmail` matches the account fixture to the directory, since there is no session.

Only Medela users are assignable. Hospital staff rows are read-only and carry no role badge, because platform roles are Medela-internal.

## Gotchas

- The role menu renders only when the viewer holds `requests:review`; everyone else sees a plain `RoleBadge`. The screen never offers an action it cannot perform.
- Accepting a request appends the person to the Medela directory with the role they asked for. Rejecting drops the request. The shared queue resets on a full reload.
- The header badge uses `roleNotificationCount`: only an internal Admin with a non-empty queue sees it. That is why IT and Biomed never get a red mark they cannot act on.
- Role permissions are listed inline in the assign menu rather than behind a nested tooltip — a tooltip portals outside the popover, so pressing it would close the menu.
- Initials live on the fixtures. Do not derive them from names: "Dr. Marco Rossi" would produce the wrong mark.
- Switching sections clears the query. A search written for one directory rarely matches the other, and a hidden filter on arrival reads as an empty list.
- `AccessRequestList` deliberately has no heading and reuses the directory panel's frame, so the three sections are visually interchangeable. The switch is the only thing that names them.

## Out of scope

Enforcing these permissions. Gating `/internal` or the Upload firmware button needs a real session. This screen describes and assigns roles; it does not restrict navigation.
