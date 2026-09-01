import { cn } from "@/lib/utils";

/**
 * Initials avatar used as the header trigger and on the profile page.
 *
 * @param initials - Two-letter mark, already computed on the fixture user
 * @param size - `sm` for the header (32px), `lg` for the profile heading
 */
export function AccountAvatar({
  initials,
  size = "sm",
}: {
  initials: string;
  size?: "sm" | "lg";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground",
        size === "lg" ? "size-16 text-lg" : "size-8 text-xs",
      )}
    >
      {initials}
    </span>
  );
}
