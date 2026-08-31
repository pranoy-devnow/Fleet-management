import { cn } from "@/lib/utils";

/**
 * Frosted floating panel shared by the header search and the list menus.
 * Positioning is left to the caller so each trigger can anchor its own way.
 *
 * @param className - Positioning and sizing utilities, e.g. `top-full right-0 w-72`
 */
export function PopoverSurface({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute z-50 overflow-hidden rounded-2xl bg-white/95 shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/8 backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
