import { AssignedDeviceList } from "@/features/devices/components/assigned-device-list";
import { listPostRegistrationDevices } from "@/features/devices/repositories/device-repository";
import { AppShell } from "@/features/shell/app-shell";

export default function BiomedWelcomePage() {
  const devices = listPostRegistrationDevices();

  return (
    <AppShell title="My Devices" subtitle="Registration complete — welcome to Medela">
      <div className="max-w-2xl">
        <div className="mb-4 rounded-lg border border-primary/20 bg-secondary px-4 py-3 text-sm text-primary">
          Your newly registered device appears here, along with any others assigned to your account.
        </div>
        <AssignedDeviceList devices={devices} hrefFor={(device) => `/biomed/devices/${device.id}/status`} />
      </div>
    </AppShell>
  );
}
