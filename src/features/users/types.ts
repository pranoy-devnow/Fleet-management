/**
 * A single thing a role is allowed to do. Permissions are granular and never
 * bundled implicitly — a role lists every permission it grants.
 */
export type Permission = "requests:review" | "overview:view" | "firmware:upload";

/**
 * Assignable platform role for Medela staff.
 *
 * Admin and IT are separate jobs, not a hierarchy: Admin does not inherit IT's
 * permissions.
 */
export type PlatformRole = "admin" | "it";

/**
 * A Medela staff member. Their role can be changed by an admin.
 */
export type MedelaUser = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: PlatformRole;
  initials: string;
};

/**
 * A hospital staff member. Read-only here — platform roles are Medela-internal.
 */
export type HospitalUser = {
  id: string;
  name: string;
  email: string;
  hospital: string;
  city: string;
  country: string;
  initials: string;
};

/**
 * A person asking for platform access, pending an admin decision.
 */
export type AccessRequest = {
  id: string;
  name: string;
  email: string;
  department: string;
  requestedRole: PlatformRole;
  requestedOn: string;
  initials: string;
};

/** Which directory the management screen is showing. */
export type UserDirectoryTab = "medela" | "hospital";

/**
 * Which section of the management screen is visible. Only one shows at a time;
 * `requests` is offered only to viewers who may review them.
 */
export type UserManagementSection = "requests" | UserDirectoryTab;
