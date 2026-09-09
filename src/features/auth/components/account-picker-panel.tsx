import { Building2, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AccountTypeCard } from "@/features/auth/components/account-type-card";
import { signInHref } from "@/features/auth/lib/account-routes";
import type { AccountType } from "@/features/auth/types";
import { Panel } from "@/features/shell/panel";

type AccountTypeOption = {
  value: AccountType;
  icon: LucideIcon;
  title: string;
  description: string;
};

/** The two portals, in the order they are offered. */
const ACCOUNT_TYPE_OPTIONS: readonly AccountTypeOption[] = [
  {
    value: "medela",
    icon: Building2,
    title: "Medela Internal",
    description: "Fleet, firmware and roles",
  },
  {
    value: "biomed",
    icon: Stethoscope,
    title: "Biomed",
    description: "Hospital devices and updates",
  },
];

/**
 * Account picker in a white card. The entry screen supplies the black frame and
 * the lockup above this block.
 *
 * Each card is the navigation: Medela Internal opens the staff sign-in page,
 * Biomed opens the hospital one.
 */
export function AccountPickerPanel() {
  return (
    <Panel className="w-full p-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Select an account</h1>

      <div className="mt-6 flex flex-col gap-3">
        {ACCOUNT_TYPE_OPTIONS.map((option) => (
          <AccountTypeCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            description={option.description}
            href={signInHref(option.value)}
          />
        ))}
      </div>
    </Panel>
  );
}
