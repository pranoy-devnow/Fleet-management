import type { MedelaUser } from "../types";

/**
 * Medela staff fixtures. Departments match the options offered on the staff
 * registration form.
 *
 * Sarah Chen is the signed-in profile in `features/account`, and is an admin so
 * the prototype's viewer can actually assign roles.
 */
export const MEDELA_USERS: MedelaUser[] = [
  {
    id: "mu-01",
    name: "Sarah Chen",
    email: "sarah.chen@medela.com",
    department: "Clinical Engineering",
    role: "admin",
    initials: "SC",
  },
  {
    id: "mu-02",
    name: "Jane Doe",
    email: "jane.doe@medela.com",
    department: "Clinical Engineering",
    role: "admin",
    initials: "JD",
  },
  {
    id: "mu-03",
    name: "Tobias Meyer",
    email: "tobias.meyer@medela.com",
    department: "Field Service",
    role: "it",
    initials: "TM",
  },
  {
    id: "mu-04",
    name: "Priya Nair",
    email: "priya.nair@medela.com",
    department: "IT / Infrastructure",
    role: "it",
    initials: "PN",
  },
  {
    id: "mu-05",
    name: "Luis Gomez",
    email: "luis.gomez@medela.com",
    department: "Product Management",
    role: "it",
    initials: "LG",
  },
  {
    id: "mu-06",
    name: "Anna Kowalski",
    email: "anna.kowalski@medela.com",
    department: "Clinical Engineering",
    role: "it",
    initials: "AK",
  },
  {
    id: "mu-07",
    name: "Mark Feldman",
    email: "mark.feldman@medela.com",
    department: "Field Service",
    role: "it",
    initials: "MF",
  },
  {
    id: "mu-08",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@medela.com",
    department: "IT / Infrastructure",
    role: "admin",
    initials: "YT",
  },
];
