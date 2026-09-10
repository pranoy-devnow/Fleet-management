# Auth

Medela Internal login and registration. This build has no hospital portal.

## How to use

- `/` redirects to `/login/medela`
- `/login/medela` and `/register/medela` — staff path

Login and register sit in `BrandFocusLayout` — black field, official lockup parked above a white card. The lockup does not move when a form grows; only the card scrolls.

Sign In / Register skip credentials for this prototype (`noValidate` + no Zod on submit).

## Gotchas

- There is no real session. Log out returns to `/login/medela`.
- Fields are decorative until real auth is added.
- Branding comes from `features/brand` (`MedelaLogo`, `MedelaMark`, `BrandFocusLayout`). Do not re-draw the lockup here.
