import { AppHeader } from "@/features/shell/app-header";
import { SignOffCard } from "@/features/shell/sign-off-card";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  variant?: "default" | "form";
  /**
   * Lock the page to the viewport so chrome (header, title) stays put and a
   * child list can scroll in the remaining height.
   */
  fill?: boolean;
};

/**
 * Authenticated chrome: frosted toolbar, large title, optional firmware sign-off.
 */
export function AppShell({
  children,
  title,
  subtitle,
  headerAction,
  variant = "default",
  fill = false,
}: AppShellProps) {
  return (
    <div className={fill ? "flex h-dvh flex-col overflow-hidden bg-background" : "min-h-screen bg-background"}>
      <AppHeader />
      <main
        className={
          fill
            ? "mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col px-8 pt-10 pb-6"
            : "mx-auto max-w-[1440px] px-8 py-10"
        }
      >
        {(title || subtitle || headerAction) && (
          <div className="mb-8 flex shrink-0 items-end justify-between gap-4">
            <div>
              {title ? (
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
              ) : null}
              {subtitle ? <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>
            {headerAction}
          </div>
        )}
        <div
          className={
            variant === "form"
              ? "max-w-2xl"
              : fill
                ? "flex min-h-0 flex-1 flex-col"
                : undefined
          }
        >
          {children}
          {variant === "form" ? <SignOffCard /> : null}
        </div>
      </main>
    </div>
  );
}
