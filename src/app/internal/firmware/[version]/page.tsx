import { FirmwareDetail } from "@/features/firmware/components/firmware-detail";

export default async function FirmwareDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ version: string }>;
  searchParams: Promise<{ deviceType?: string; model?: string }>;
}) {
  const { version } = await params;
  const query = await searchParams;
  const deviceType = query.deviceType ?? query.model ?? "Freestyle Hands-free";

  return (
    <FirmwareDetail
      version={decodeURIComponent(version)}
      deviceType={deviceType}
    />
  );
}
