import { BrandMark } from "@/features/shell/brand-mark";
import { Panel } from "@/features/shell/panel";

/**
 * Centered login/register frame with the Kingfisher wordmark.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3">
            <BrandMark size="md" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Kingfisher</h1>
          <p className="text-sm text-muted-foreground">Fleet Management Portal</p>
        </div>
        <Panel className="p-8">{children}</Panel>
      </div>
    </div>
  );
}
