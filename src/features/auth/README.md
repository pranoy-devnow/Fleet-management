# Auth

Role picker, Medela staff login/register, and Biomed login/register.

## How to use

- `/` — choose Medela Internal or Biomed / Hospital Staff
- `/login/medela` and `/register/medela` — staff path
- `/login/biomed` and `/register/biomed` — hospital path

Sign In / Register skip credentials for this prototype (`noValidate` + no Zod on submit).

### Biomed registration is two steps

1. `DeviceLocationStep` — pick the device's country from a searchable list of the countries the fleet operates in
2. `BiomedDetailsStep` — account and device details, with the chosen country pinned at the top and a way back

`BiomedRegisterForm` owns the step and country state; both steps share `AuthStepHeading` for the "Step N of 2" progress.

## Gotchas

- There is no real session. Log out just returns to `/`.
- Fields are decorative until real auth is added.
- Step one uses `SearchInputRow`, the same search row as the header popover. Keep them unified rather than styling a one-off input here.
- The chosen country rides along as a hidden `country` input, so submitted form data matches what step one collected. Hospital stays a free-text field, since the fleet's hospital list would exclude any new site.
