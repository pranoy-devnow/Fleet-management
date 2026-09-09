import { AccountPickerPanel } from "@/features/auth/components/account-picker-panel";
import { BrandFocusLayout } from "@/features/brand/components/brand-focus-layout";

/**
 * The portal's only unauthenticated entry point: pick Medela Internal or Biomed,
 * then continue on that portal's existing sign-in page.
 *
 * Shares `BrandFocusLayout` with login and register so arriving here and
 * continuing feels like one product.
 */
export function EntryScreen() {
  return (
    <BrandFocusLayout>
      <AccountPickerPanel />
    </BrandFocusLayout>
  );
}
