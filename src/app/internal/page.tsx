import { Upload } from "lucide-react";
import Link from "next/link";

import { DashboardFleetMap } from "@/features/devices/components/dashboard-fleet-map";
import { StatCards } from "@/features/devices/components/stat-cards";
import { AppShell } from "@/features/shell/app-shell";
import { PrimaryActionButton } from "@/features/shell/primary-action-button";

export default function InternalDashboardPage() {
  return (
    <AppShell
      headerAction={
        <PrimaryActionButton
          render={<Link href="/internal/firmware/upload" />}
          nativeButton={false}
          // White on brand yellow fails contrast; teal is Medela's readable white-text fill.
          className="gap-2 bg-brand-teal text-white hover:bg-brand-teal-dark"
        >
          <Upload size={15} />
          Upload firmware
        </PrimaryActionButton>
      }
    >
      <StatCards />
      <DashboardFleetMap />
    </AppShell>
  );
}
