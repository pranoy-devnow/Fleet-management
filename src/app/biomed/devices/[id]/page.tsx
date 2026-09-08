import { DeviceUpdateScreen } from "@/features/devices/components/device-update-screen";

export default async function DeviceDetailUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DeviceUpdateScreen deviceId={id} />;
}
