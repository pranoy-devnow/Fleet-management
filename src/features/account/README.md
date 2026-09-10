# Account

Header avatar menu, profile, and role management for the prototype signed-in Medela Internal user.

## How to use

- `AccountMenu` lives in `AppHeader`. Everyone sees Profile, Role management, and Log out. Admins see a notification badge for pending access requests; opening the menu repeats that count next to Role management.
- `/internal/profile` — read-only account details
- `/internal/roles` — user management (Admin / IT)

This module is only ever about the signed-in user. Managing other people lives in [`features/users`](../users/README.md), which owns `/internal/roles`.

`getAccountUser` is the only way UI should learn who is "signed in". There is no session.

## Gotchas

- Log out goes to `/login/medela`. It does not clear state because there is none.
- The fixture's email must stay in the `features/users` Medela directory, or the user-management screen cannot tell that the viewer is an admin.
- Initials are stored on the fixture. Do not derive them from the name — titles like "Dr." would produce the wrong mark.
