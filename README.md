# Medela Fleet Management

Prototype portal for Medela Internal staff to review connected breast-pump devices, publish firmware, and inspect release history.

This is a **front-end prototype**. There is no real session, API, or persistence. In-memory stores reset on a full page reload. `/internal/*` is publicly reachable.

## Scripts

```bash
npm run dev    # http://localhost:3000
npm test       # Vitest unit suite
npm run lint   # ESLint
```

## Routes

| Path | Screen |
| --- | --- |
| `/` | Redirects to `/login/medela` |
| `/login/medela` | Microsoft SSO card (prototype: continues with no Entra handshake) |
| `/internal` | Device list |
| `/internal/devices` | Redirects to `/internal` (keeps `?status=`) |
| `/internal/devices/[id]` | Device detail and OTA update |
| `/internal/firmware` | Firmware history |
| `/internal/firmware/upload` | Publish a release |
| `/internal/firmware/[version]` | Release detail (`?deviceType=` required) |
| `/internal/profile` | Read-only account fixture |

There is no register route.

## Feature modules

Code lives under `src/features/`, organized by domain:

| Module | Role |
| --- | --- |
| `auth` | Sign-in card |
| `account` | Header menu and profile fixture |
| `brand` | Lockup, trefoil, auth frame |
| `devices` | Fleet list, filters, device detail |
| `firmware` | History, publish, release detail |
| `shell` | Shared chrome and list/form primitives |

Authenticated **pages** wrap `AppShell`. Feature screens return content only.

## Prototype limits

- Login is `router.push("/internal")`. There is no cookie, middleware, or route guard.
- One signed-in user comes from `getAccountUser()`.
- Device and firmware mutations live in module-scoped stores and vanish on reload.
- The publish dropzone is visual only; Zod validates version and notes.

Unused list menus, dialogs, and unused shadcn table/select/badge primitives were removed on purpose. Do not treat that as a missing backlog — rebuild them when a screen needs them.

## For implementers

- Replace the in-memory stores with an API. Keep repositories as the read boundary.
- Add real Entra SSO and middleware so `/internal/*` is not public.
- Keep Zod at form and API boundaries (`parseFormData` on the client).
- Do not import `AppShell` from feature screens; wrap it in the route file.
