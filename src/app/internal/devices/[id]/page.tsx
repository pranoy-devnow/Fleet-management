import { notFound } from "next/navigation";

import { DeviceDetailScreen } from "@/features/devices/components/device-detail-screen";
import { getWorldDeviceById } from "@/features/devices/repositories/device-repository";
import { AppShell } from "@/features/shell/app-shell";

export default async function DeviceStatusDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getWorldDeviceById(id)) notFound();

  return (
    <AppShell title="Device Status Detail">
      <DeviceDetailScreen deviceId={id} />
    </AppShell>
  );
}
