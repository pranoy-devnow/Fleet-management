import { DeviceTable } from "@/features/devices/components/device-table";

export default async function DeviceListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  return <DeviceTable initialStatus={params.status ?? "all"} />;
}
