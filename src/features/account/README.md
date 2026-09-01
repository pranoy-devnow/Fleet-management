# Account

Header avatar menu, profile, and role management for the prototype signed-in user.

## How to use

- `AccountMenu` lives in `AppHeader`. It reads the path to decide Medela vs Biomed. Internal Admins see a notification badge for pending access requests; opening the menu repeats that count next to Role management.
- `/internal/profile` and `/biomed/profile` — read-only account details
- `/biomed/roles` — switch between the two portal roles

This module is only ever about the signed-in user. Managing other people lives in [`features/users`](../users/README.md), which owns `/internal/roles`.

`getAccountUser` and `resolvePortalRole` are the only way UI should learn who is "signed in". There is no session.

## Gotchas

- Log out still goes to `/`. It does not clear state because there is none.
- Switching roles is just navigation to the other portal home.
- `RoleManagementScreen` is the portal switcher and is now only reachable from `/biomed/roles`. The internal side renders `UserManagementScreen` instead.
- The internal fixture's email must stay in the `features/users` Medela directory, or the user-management screen cannot tell that the viewer is an admin.
- Initials are stored on the fixture. Do not derive them from the name — titles like "Dr." would produce the wrong mark.
