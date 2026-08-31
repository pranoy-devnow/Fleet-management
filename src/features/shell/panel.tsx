import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Soft Apple-like surface: 16px radius, hairline ring, light layered shadow.
 */
export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "gap-0 rounded-2xl py-0 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] ring-black/8",
        className,
      )}
    >
      {children}
    </Card>
  );
}
