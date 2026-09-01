import { UserRow } from "./user-row";
import type { HospitalUser } from "../types";

/**
 * One hospital staff row. Read-only and badge-free: platform roles are
 * Medela-internal, so hospital staff hold none.
 *
 * @param user - Hospital contact to render
 */
export function HospitalUserRow({ user }: { user: HospitalUser }) {
  return (
    <UserRow
      initials={user.initials}
      name={user.name}
      email={user.email}
      detail={`${user.hospital} · ${user.city}, ${user.country}`}
    />
  );
}
