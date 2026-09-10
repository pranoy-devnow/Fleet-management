import { MedelaLogo } from "@/features/brand/components/medela-logo";
import { MedelaMark } from "@/features/brand/components/medela-mark";

/** Lockup size on the black auth pages — large enough to lead the screen. */
const FOCUS_LOCKUP_CLASS = "h-16 text-white sm:h-20";

/**
 * Shared frame for `/` and login: black field, large official lockup sitting
 * directly above the white card.
 *
 * The lockup is taken out of document flow and parked at `20vh` — high enough
 * to sit above the card, not so high it reads as a header. That offset does
 * not depend on card height, so the wordmark stays put. The scroll pane's top
 * padding reserves the same slot, which is why the card always starts just
 * underneath.
 *
 * @param children - The white card; this layout does not wrap it
 */
export function BrandFocusLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate h-svh overflow-hidden bg-brand-ink">
      <BrandBackdrop />
      <div className="absolute inset-x-0 top-0 z-10 bg-brand-ink pt-[20vh] pb-2">
        <div className="flex justify-center">
          <MedelaLogo className={FOCUS_LOCKUP_CLASS} />
        </div>
      </div>
      <div className="h-full overflow-y-auto px-6 pt-[calc(20vh+7.5rem)] pb-10">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

/** Quiet trefoil so the black page still reads as Medela without competing with the card. */
function BrandBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <MedelaMark className="absolute -right-16 -bottom-20 size-[22rem] opacity-[0.07] sm:size-[28rem]" />
    </div>
  );
}
