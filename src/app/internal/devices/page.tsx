import { redirect } from "next/navigation";

/**
 * The fleet list now lives on `/internal`. Keep this path so old links and
 * bookmarks still land on the same filters.
 */
export default async function DeviceListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status?.trim();
  redirect(status ? `/internal?status=${encodeURIComponent(status)}` : "/internal");
}
