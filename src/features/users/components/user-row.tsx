/**
 * Shared directory row: initials mark, name over email, a secondary detail, and
 * a trailing control.
 *
 * Rows carry no hover background on purpose — the panel keeps its rounded
 * corners without an `overflow-hidden` that would clip a row's role menu.
 *
 * @param initials - Two-letter mark for the person
 * @param name - Display name
 * @param email - Address shown under the name
 * @param detail - Secondary line, e.g. department or hospital and city
 * @param trailing - Role badge or role menu, omitted for read-only lists
 */
export function UserRow({
  initials,
  name,
  email,
  detail,
  trailing,
}: {
  initials: string;
  name: string;
  email: string;
  detail: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span
        aria-hidden="true"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-black/6 text-xs font-semibold text-foreground"
      >
        {initials}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>

      <p className="hidden min-w-0 max-w-[14rem] flex-1 truncate text-xs text-muted-foreground sm:block">
        {detail}
      </p>

      {trailing}
    </div>
  );
}
