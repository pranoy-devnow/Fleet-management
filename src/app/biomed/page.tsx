import { AssignedDeviceList } from "@/features/devices/components/assigned-device-list";
import { listAssignedDevices } from "@/features/devices/repositories/device-repository";
import { AppShell } from "@/features/shell/app-shell";

export default function BiomedDashboardPage() {
  const devices = listAssignedDevices();

  return (
    <AppShell title="My Devices" subtitle="Devices assigned to Dr. Marco Rossi · Charité Universitätsmedizin">
      <div className="max-w-2xl">
        <AssignedDeviceList devices={devices} hrefFor={(device) => `/biomed/devices/${device.id}`} />
      </div>
    </AppShell>
  );
}
