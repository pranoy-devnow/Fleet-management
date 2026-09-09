# Auth

The account-picker entry screen, Medela staff login/register, and Biomed login/register.

## How to use

- `/` — `EntryScreen`: pick Medela Internal or Biomed
- `/login/medela` and `/register/medela` — staff path
- `/login/biomed` and `/register/biomed` — hospital path

### The entry screen is an account picker

`EntryScreen`, login and register all sit in `BrandFocusLayout` — black field, official lockup parked above a white card. The lockup does not move when a form grows; only the card scrolls. Each `AccountTypeCard` is a link to that portal's existing sign-in page (`signInHref` in `lib/account-routes.ts`). There is no second "continue" step.

Sign In / Register skip credentials for this prototype (`noValidate` + no Zod on submit).

### Biomed registration is two steps

1. `DeviceLocationStep` — pick the device's country from a searchable list of the countries the fleet operates in. It lives in the devices feature, since adding a device to an existing account reuses it
2. `BiomedDetailsStep` — account and device details, with the chosen country pinned at the top and a way back

`BiomedRegisterForm` owns the step and country state; both steps share the shell's `StepHeading` for the "Step N of 2" progress.

## Gotchas

- There is no real session. Log out just returns to `/`.
- Fields are decorative until real auth is added.
- Branding comes from `features/brand` (`MedelaLogo`, `MedelaMark`, `BrandFocusLayout`). Do not re-draw the lockup here. `/`, `/login/*` and `/register/*` share that frame so the yellow-on-black treatment cannot drift.
- Step one uses `SearchInputRow`, the same search row as the header popover. Keep them unified rather than styling a one-off input here.
- Auth imports from devices, never the reverse. Anything both features need lives in devices or in the shell.
- The chosen country rides along as a hidden `country` input, so submitted form data matches what step one collected. Hospital stays a free-text field, since the fleet's hospital list would exclude any new site.
