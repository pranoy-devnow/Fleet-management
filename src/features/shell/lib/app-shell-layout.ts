/** Page chrome variants that change how the main column is padded. */
export type AppShellVariant = "default" | "form";

/**
 * Whether the shell should lock to the viewport (header + tabs stay put).
 *
 * Fleet tabs imply a locked viewport so every tab screen uses the same
 * main padding; otherwise the upload form's `py-10` shifts the tab bar.
 *
 * @param fill - Caller asked for a fill list page
 * @param fleetNav - Caller asked for the shared fleet tabs
 */
export function shouldLockAppShell(fill: boolean, fleetNav: boolean): boolean {
  return fill || fleetNav;
}

/**
 * Classes for the scrolling (or filling) slot under the title and tabs.
 *
 * @param variant - Form pages constrain width; list pages flex to fill
 * @param lockViewport - When true, leftover height scrolls or flexes
 */
export function appShellContentClass(
  variant: AppShellVariant,
  lockViewport: boolean,
): string | undefined {
  if (variant === "form") {
    return lockViewport ? "min-h-0 max-w-2xl flex-1 overflow-y-auto" : "max-w-2xl";
  }
  return lockViewport ? "flex min-h-0 flex-1 flex-col" : undefined;
}
