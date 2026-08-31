import { AppHeader } from "@/features/shell/app-header";
import { SignOffCard } from "@/features/shell/sign-off-card";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  variant?: "default" | "form";
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
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-[1440px] px-8 py-10">
        {(title || subtitle) && (
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              {title ? (
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
              ) : null}
              {subtitle ? <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>
            {headerAction}
          </div>
        )}
        <div className={variant === "form" ? "max-w-2xl" : undefined}>
          {children}
          {variant === "form" ? <SignOffCard /> : null}
        </div>
      </main>
    </div>
  );
}
