import { FirmwareHistoryTable } from "@/features/firmware/components/firmware-history-table";
import { AppShell } from "@/features/shell/app-shell";

export default function FirmwareHistoryPage() {
  return (
    <AppShell fill fleetNav>
      <FirmwareHistoryTable />
    </AppShell>
  );
}
