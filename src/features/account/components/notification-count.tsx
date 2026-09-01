import { cn } from "@/lib/utils";

/**
 * Count pill used on the header and next to Role management.
 *
 * Hidden when the count is zero so an empty badge never appears.
 *
 * @param count - Pending notifications to show
 * @param size - `lg` for the header avatar, `sm` for the menu row
 * @param className - Extra utilities
 */
export function NotificationCount({
  count,
  size = "sm",
  className,
}: {
  count: number;
  size?: "sm" | "lg";
  className?: string;
}) {
  if (count < 1) return null;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-destructive font-semibold text-white",
        size === "lg"
          ? "h-6 min-w-6 px-1.5 text-xs leading-none"
          : "h-4 min-w-4 px-1 text-[10px] leading-none",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
