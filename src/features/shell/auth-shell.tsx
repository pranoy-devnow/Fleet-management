import { BrandFocusLayout } from "@/features/brand/components/brand-focus-layout";
import { Panel } from "@/features/shell/panel";

/**
 * Frame for the sign-in screen.
 *
 * Black field and large lockup, with the form in a white card. `/` redirects
 * here, so arriving at sign-in is the start of the product.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <BrandFocusLayout>
      <Panel className="w-full p-8">{children}</Panel>
    </BrandFocusLayout>
  );
}
