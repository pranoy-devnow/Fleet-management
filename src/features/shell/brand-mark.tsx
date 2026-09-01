import { cn } from "@/lib/utils";

/**
 * Medela "M" mark used on auth screens and the app header.
 */
export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box = {
    sm: "size-7 rounded-md text-xs",
    md: "size-10 rounded-xl text-lg",
    lg: "size-14 rounded-2xl text-2xl shadow-lg",
  }[size];

  return (
    <div className={cn("flex items-center justify-center bg-primary text-primary-foreground font-bold", box)}>
      M
    </div>
  );
}
