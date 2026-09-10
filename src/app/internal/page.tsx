import { DeviceTable } from "@/features/devices/components/device-table";
import { AppShell } from "@/features/shell/app-shell";

export default async function InternalDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;

  return (
    <AppShell fill fleetNav>
      <DeviceTable key={params.status ?? "all"} initialStatus={params.status ?? "all"} />
    </AppShell>
  );
}
