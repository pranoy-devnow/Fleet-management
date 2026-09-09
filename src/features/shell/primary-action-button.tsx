import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The one action that moves a screen forward: Sign in, Register, Add device,
 * Upload firmware.
 *
 * Medela's own button system reserves yellow for exactly this and uses teal for
 * everything secondary, so the rule is one of these per screen — reach for a
 * plain `Button` for anything alongside it. Defined once so the whole platform
 * shares a single notion of "primary", rather than each form repeating a class
 * string that slowly diverges.
 *
 * Width is left to the caller: forms pass `w-full`, toolbar actions do not.
 *
 * @param className - Extra classes, applied after the shared sizing
 */
export function PrimaryActionButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="brand"
      className={cn("h-11 rounded-xl px-5 text-[15px] font-semibold", className)}
      {...props}
    />
  );
}
