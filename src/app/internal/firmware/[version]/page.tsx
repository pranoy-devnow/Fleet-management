import { notFound } from "next/navigation";

import { FirmwareDetail } from "@/features/firmware/components/firmware-detail";
import { getFirmwareRelease } from "@/features/firmware/repositories/firmware-repository";

export default async function FirmwareDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ version: string }>;
  searchParams: Promise<{ model?: string }>;
}) {
  const { version } = await params;
  const { model } = await searchParams;
  const release = getFirmwareRelease(decodeURIComponent(version), model ?? "Freestyle Hands-free");
  if (!release) notFound();

  return <FirmwareDetail release={release} />;
}
