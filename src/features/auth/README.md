# Auth

Medela Internal sign-in. This build has no hospital portal.

## How to use

- `/` redirects to `/login/medela`
- `/login/medela` — Azure AD SSO card (Microsoft button)

Login sits in `BrandFocusLayout` — black field, official lockup parked above a white card. The lockup does not move when the card grows; only the card scrolls.

The Microsoft button continues to `/internal` with no Entra handshake.

## Gotchas

- There is no real session. Log out returns to `/login/medela`.
- Branding comes from `features/brand` (`MedelaLogo`, `MedelaMark`, `BrandFocusLayout`). Do not re-draw the lockup here.
- The Microsoft mark uses Microsoft's published square colours, not Medela tokens.
- There is no register route. First-time access is out of scope for this prototype.
