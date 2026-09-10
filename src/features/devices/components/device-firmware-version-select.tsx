import type { FirmwareUpdateOffer } from "@/features/devices/types";
import { InfoTooltip } from "@/features/shell/info-tooltip";
import { NativeSelect } from "@/features/shell/native-select";

/**
 * Version picker for an available firmware update. The info icon sits next to
 * the Version label and describes the selected package.
 *
 * @param offers - Installable packages, newest first
 * @param value - Currently selected version label
 * @param onChange - Receives the newly chosen version
 * @param selected - Offer matching `value`, used for the details tooltip
 */
export function DeviceFirmwareVersionSelect({
  offers,
  value,
  onChange,
  selected,
}: {
  offers: FirmwareUpdateOffer[];
  value: string;
  onChange: (version: string) => void;
  selected: FirmwareUpdateOffer;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-foreground">Version</span>
          <InfoTooltip label="Update details">
            <dl className="space-y-1.5 text-sm">
              <div className="flex gap-4">
                <dt className="w-16 shrink-0 text-muted-foreground">Version</dt>
                <dd className="font-medium text-foreground">{selected.version}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-16 shrink-0 text-muted-foreground">Details</dt>
                <dd className="text-foreground">{selected.notes}</dd>
              </div>
            </dl>
          </InfoTooltip>
        </div>
        <NativeSelect
          value={value}
          onChange={onChange}
          options={offers.map((offer) => [offer.version, offer.version] as const)}
        />
      </div>
    </div>
  );
}
