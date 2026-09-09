"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { AddDeviceModal } from "@/features/devices/components/add-device-modal";
import { AssignedDeviceList } from "@/features/devices/components/assigned-device-list";
import { useAssignedDevices } from "@/features/devices/hooks/use-assigned-devices";
import { biomedDeviceHref, type BiomedDeviceView } from "@/features/devices/lib/device-hrefs";
import { AppShell } from "@/features/shell/app-shell";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";

/**
 * The signed-in biomed's device list, with a way to register another device.
 *
 * Both biomed list routes render this, so a device added from either one shows
 * up on the other. They differ only in where a row goes.
 *
 * @param rowView - Which device page a row opens. A plain string, not a
 *   callback, because a server page renders this across the client boundary
 */
export function MyDevicesScreen({ rowView }: { rowView: BiomedDeviceView }) {
  const { devices, add } = useAssignedDevices();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <AppShell
      title="My Devices"
      headerAction={
        <PrimaryActionButton type="button" onClick={() => setIsAdding(true)} className="gap-2">
          <Plus size={16} />
          Add new device
        </PrimaryActionButton>
      }
    >
      <div className="max-w-2xl">
        <AssignedDeviceList
          devices={devices}
          hrefFor={(device) => biomedDeviceHref(device.id, rowView)}
        />
      </div>

      {isAdding ? (
        <AddDeviceModal onAdd={add} onClose={() => setIsAdding(false)} />
      ) : null}
    </AppShell>
  );
}
