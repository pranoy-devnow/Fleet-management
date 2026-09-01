import type { HospitalUser } from "../types";

/**
 * Hospital staff fixtures. Hospital, city, and country match entries in the
 * fleet data so the directory lines up with the device list.
 */
export const HOSPITAL_USERS: HospitalUser[] = [
  {
    id: "hu-01",
    name: "Dr. Marco Rossi",
    email: "bioeng@charite.de",
    hospital: "Charité — NICU Ward 3",
    city: "Berlin",
    country: "Germany",
    initials: "MR",
  },
  {
    id: "hu-02",
    name: "Emma Wright",
    email: "e.wright@kch.nhs.uk",
    hospital: "King's College Hospital",
    city: "London",
    country: "UK",
    initials: "EW",
  },
  {
    id: "hu-03",
    name: "Sophie Laurent",
    email: "s.laurent@necker.fr",
    hospital: "Hôpital Necker",
    city: "Paris",
    country: "France",
    initials: "SL",
  },
  {
    id: "hu-04",
    name: "Daan Visser",
    email: "d.visser@amc.nl",
    hospital: "AMC Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    initials: "DV",
  },
  {
    id: "hu-05",
    name: "Rachel Adams",
    email: "r.adams@nyulangone.org",
    hospital: "NYU Langone NICU",
    city: "New York",
    country: "USA",
    initials: "RA",
  },
  {
    id: "hu-06",
    name: "Carlos Mendes",
    email: "c.mendes@hc.br",
    hospital: "Hospital das Clínicas",
    city: "São Paulo",
    country: "Brazil",
    initials: "CM",
  },
  {
    id: "hu-07",
    name: "Kenji Sato",
    email: "k.sato@todai-hosp.jp",
    hospital: "Tokyo University Hospital",
    city: "Tokyo",
    country: "Japan",
    initials: "KS",
  },
  {
    id: "hu-08",
    name: "Aisha Khan",
    email: "a.khan@mediclinic.ae",
    hospital: "Mediclinic City Hospital",
    city: "Dubai",
    country: "UAE",
    initials: "AK",
  },
];
