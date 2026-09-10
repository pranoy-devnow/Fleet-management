# Account

Header avatar menu and profile for the prototype signed-in Medela Internal user.

## How to use

- `AccountMenu` lives in `AppHeader`. Everyone sees Profile and Log out.
- `/internal/profile` — read-only account details

This module is only ever about the signed-in user.

`getAccountUser` is the only way UI should learn who is "signed in". There is no session.

## Gotchas

- Log out goes to `/login/medela`. It does not clear state because there is none.
- Initials are stored on the fixture. Do not derive them from the name — titles like "Dr." would produce the wrong mark.
