import { RoleBadge } from "./role-badge";
import { RoleMenu } from "./role-menu";
import { UserRow } from "./user-row";
import type { MedelaUser, PlatformRole } from "../types";

/**
 * One Medela staff row. Shows a role menu only when the viewer may reassign, so
 * the screen never offers an action it cannot perform.
 *
 * @param user - Staff member to render
 * @param canAssign - Whether the viewer holds the permission to change roles
 * @param onAssign - Receives the newly chosen role
 */
export function MedelaUserRow({
  user,
  canAssign,
  onAssign,
}: {
  user: MedelaUser;
  canAssign: boolean;
  onAssign: (role: PlatformRole) => void;
}) {
  return (
    <UserRow
      initials={user.initials}
      name={user.name}
      email={user.email}
      detail={user.department}
      trailing={
        canAssign ? (
          <RoleMenu userName={user.name} role={user.role} onAssign={onAssign} />
        ) : (
          <RoleBadge role={user.role} />
        )
      }
    />
  );
}
