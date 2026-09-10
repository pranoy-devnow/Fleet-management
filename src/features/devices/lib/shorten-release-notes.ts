/**
 * First clause of release notes so a device history row stays one short line.
 *
 * @param notes - Full catalog notes
 * @returns Text before the first dash or comma, without a trailing period
 */
export function shortenReleaseNotes(notes: string): string {
  const firstClause = notes.split(/\s+[—–]\s+|,\s+/)[0] ?? notes;
  return firstClause.replace(/\.\s*$/, "").trim();
}
