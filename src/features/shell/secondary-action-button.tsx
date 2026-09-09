import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * An action offered *alongside* the primary one: Retry, Edit, Cancel.
 *
 * Teal outline, sized to match `PrimaryActionButton` so the two sit level in a
 * row. Medela's system puts teal a step below yellow, which is exactly the
 * relationship wanted here — visible, but not the thing to click by default.
 *
 * @param className - Extra classes, applied after the shared sizing
 */
export function SecondaryActionButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-11 gap-2 rounded-xl border-primary px-5 text-[15px] font-semibold text-primary hover:bg-secondary hover:text-secondary-foreground",
        className,
      )}
      {...props}
    />
  );
}
