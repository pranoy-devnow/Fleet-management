import { FirmwareDetail } from "@/features/firmware/components/firmware-detail";
import { AppShell } from "@/features/shell/app-shell";

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
  const decodedVersion = decodeURIComponent(version);

  return (
    <AppShell title={`Firmware ${decodedVersion}`} variant="form">
      <FirmwareDetail version={decodedVersion} deviceType={deviceType} />
    </AppShell>
  );
}
