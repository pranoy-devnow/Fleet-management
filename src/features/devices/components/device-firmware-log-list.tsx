import type { DeviceFirmwareLogEntry } from "@/features/devices/types";
import { Panel } from "@/features/shell/panel";

/**
 * Install history for one device. Title sits in the same card as the rows,
 * separated by a hairline so it does not read as another list item.
 *
 * @param entries - Newest first
 */
export function DeviceFirmwareLogList({ entries }: { entries: readonly DeviceFirmwareLogEntry[] }) {
  return (
    <Panel className="overflow-hidden py-0">
      <div className="px-5 py-4">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Firmware history</h3>
        <p className="mt-1 text-sm text-muted-foreground">Previous firmware installed on this device.</p>
      </div>
      {entries.length === 0 ? (
        <p className="border-t border-black/6 px-5 py-8 text-sm text-muted-foreground">
          No previous installs are recorded.
        </p>
      ) : (
        <ol className="divide-y divide-black/6 border-t border-black/6">
          {entries.map((entry) => (
            <li key={`${entry.version}-${entry.installedOn}`} className="px-5 py-3.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-sm font-semibold text-foreground">{entry.version}</span>
                <span className="text-xs text-muted-foreground">{entry.installedOn}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{entry.notes}</p>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}
