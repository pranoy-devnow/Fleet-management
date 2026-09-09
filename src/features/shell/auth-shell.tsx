import { BrandFocusLayout } from "@/features/brand/components/brand-focus-layout";
import { Panel } from "@/features/shell/panel";

/**
 * Frame for the login and register screens.
 *
 * Same black field and large lockup as `/`, with the form in the same white
 * card. Arriving here from the account picker is a continuation, not a jump
 * to a different-looking product.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <BrandFocusLayout>
      <Panel className="w-full p-8">{children}</Panel>
    </BrandFocusLayout>
  );
}
