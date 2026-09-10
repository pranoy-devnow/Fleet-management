import { ProfileScreen } from "@/features/account/components/profile-screen";
import { AppShell } from "@/features/shell/app-shell";

export default function InternalProfilePage() {
  return (
    <AppShell title="Profile" subtitle="Your account details">
      <ProfileScreen homeHref="/internal" />
    </AppShell>
  );
}
