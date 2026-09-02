import { AssignedDeviceList } from "@/features/devices/components/assigned-device-list";
import { listPostRegistrationDevices } from "@/features/devices/repositories/device-repository";
import { AppShell } from "@/features/shell/app-shell";

export default function BiomedWelcomePage() {
  const devices = listPostRegistrationDevices();

  return (
    <AppShell title="My Devices">
      <div className="max-w-2xl">
        <AssignedDeviceList devices={devices} hrefFor={(device) => `/biomed/devices/${device.id}/status`} />
      </div>
    </AppShell>
  );
}
