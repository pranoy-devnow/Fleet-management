import { Upload } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DashboardFleetMap } from "@/features/devices/components/dashboard-fleet-map";
import { StatCards } from "@/features/devices/components/stat-cards";
import { AppShell } from "@/features/shell/app-shell";

export default function InternalDashboardPage() {
  return (
    <AppShell
      headerAction={
        <Button
          render={<Link href="/internal/firmware/upload" />}
          className="h-auto gap-2 rounded-full px-4 py-2"
        >
          <Upload size={15} />
          Upload firmware
        </Button>
      }
    >
      <StatCards />
      <DashboardFleetMap />
    </AppShell>
  );
}
