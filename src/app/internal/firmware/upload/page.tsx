import { UploadFirmwareForm } from "@/features/firmware/components/upload-firmware-form";
import { AppShell } from "@/features/shell/app-shell";

export default function UploadFirmwarePage() {
  return (
    <AppShell fleetNav variant="form">
      <UploadFirmwareForm />
    </AppShell>
  );
}
