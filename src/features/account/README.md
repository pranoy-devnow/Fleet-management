# Account

Header avatar menu, profile, and role management for the prototype signed-in user.

## How to use

- `AccountMenu` lives in `AppHeader`. It reads the path to decide Medela vs Biomed. Internal users see Role management; Biomed users see only Profile and Log out. Internal Admins see a notification badge for pending access requests; opening the menu repeats that count next to Role management.
- `/internal/profile` and `/biomed/profile` — read-only account details
- `/internal/roles` — user management (Admin / IT)

This module is only ever about the signed-in user. Managing other people lives in [`features/users`](../users/README.md), which owns `/internal/roles`.

`getAccountUser` and `resolvePortalRole` are the only way UI should learn who is "signed in". There is no session.

## Gotchas

- Log out still goes to `/`. It does not clear state because there is none.
- Switching roles is just navigation to the other portal home.
- Biomed menus omit Role management. The portal switcher at `/biomed/roles` is no longer linked from the account menu. The internal side renders `UserManagementScreen`.
- The internal fixture's email must stay in the `features/users` Medela directory, or the user-management screen cannot tell that the viewer is an admin.
- Initials are stored on the fixture. Do not derive them from the name — titles like "Dr." would produce the wrong mark.
