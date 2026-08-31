import { MapPin } from "lucide-react";

import { StatusChip } from "@/features/devices/components/status-chip";
import type { WorldDevice } from "@/features/devices/types";

/**
 * Side panel that shows the device under the cursor on the fleet map.
 */
export function MapHoverPanel({ device }: { device: WorldDevice | null }) {
  if (!device) {
    return (
      <div className="text-center">
        <MapPin size={22} className="mx-auto mb-2 text-border" />
        <p className="text-xs leading-relaxed text-[#9CA3AF]">Hover a pin to see device details</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF]">Device</div>
      <div className="text-sm leading-tight font-bold text-foreground">{device.id}</div>
      <div className="mt-0.5 mb-2 text-xs text-muted-foreground">
        {device.city}, {device.country}
      </div>
      <StatusChip status={device.status} />
      <div className="mt-3 flex flex-col gap-1">
        <div className="text-xs leading-snug text-muted-foreground">{device.hospital}</div>
        <div className="mt-1 text-xs text-[#9CA3AF]">FW: {device.firmware}</div>
        <div className="text-xs text-[#9CA3AF]">{device.model}</div>
      </div>
    </>
  );
}
