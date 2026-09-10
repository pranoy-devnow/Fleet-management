/**
 * Two-letter mark from a display name. First and last word, or the first two
 * letters of a single word.
 *
 * @param name - Person's display name
 * @returns Uppercase initials, or an empty string when the name is blank
 */
export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  if (!first || !last) return "";
  return `${first}${last}`.toUpperCase();
}
