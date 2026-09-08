import { DeviceStatusScreen } from "@/features/devices/components/device-status-screen";

export default async function DeviceStatusLightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DeviceStatusScreen deviceId={id} />;
}
