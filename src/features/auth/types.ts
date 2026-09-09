/**
 * Which of the two portals an account belongs to.
 *
 * `medela` is internal staff managing the whole fleet; `biomed` is hospital
 * technical staff who only ever see the devices assigned to their site. The
 * choice is made on `/` because it decides which sign-in form follows.
 */
export type AccountType = "medela" | "biomed";
