/**
 * Which authenticated portal the current path belongs to.
 */
export type PortalRole = "internal" | "biomed";

/**
 * Prototype signed-in user shown in the header menu and account pages.
 */
export type AccountUser = {
  name: string;
  email: string;
  roleLabel: string;
  organization: string;
  initials: string;
};
