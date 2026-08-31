# Auth

Role picker, Medela staff login/register, and Biomed login/register.

## How to use

- `/` — choose Medela Internal or Biomed / Hospital Staff
- `/login/medela` and `/register/medela` — staff path
- `/login/biomed` and `/register/biomed` — hospital path

Sign In / Register skip credentials for this prototype (`noValidate` + no Zod on submit).

## Gotchas

- There is no real session. Log out just returns to `/`.
- Amber callouts are product questions from the Figma prototype, not user-facing copy.
- Fields are decorative until real auth is added.
