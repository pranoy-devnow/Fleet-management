/**
 * Label/value rows used on profile and device detail cards.
 *
 * @param rows - `[label, value]` pairs, rendered in order
 */
export function DefinitionList({ rows }: { rows: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className="divide-y divide-muted">
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-4 py-3">
          <span className="w-44 shrink-0 text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-medium text-foreground">{value}</span>
        </div>
      ))}
    </div>
  );
}
