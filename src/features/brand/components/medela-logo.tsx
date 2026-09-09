import {
  MEDELA_LOCKUP_VIEW_BOX,
  MEDELA_TREFOIL_FILL,
  MEDELA_TREFOIL_PATHS,
  MEDELA_WORDMARK_PATHS,
} from "@/features/brand/lib/medela-artwork";
import { cn } from "@/lib/utils";

/**
 * Official Medela horizontal lockup: the "medela" wordmark plus the orange trefoil.
 *
 * The wordmark inherits `currentColor`, so it reads correctly on both light and
 * dark surfaces; the trefoil always keeps its brand orange.
 *
 * @param className - Sizing and text-colour classes. Set a height and let the
 *   intrinsic 168:32 aspect ratio drive the width.
 */
export function MedelaLogo({ className }: { className?: string }) {
  const { width, height } = MEDELA_LOCKUP_VIEW_BOX;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      role="img"
      aria-label="Medela"
      className={cn("h-8 w-auto text-foreground", className)}
    >
      {MEDELA_WORDMARK_PATHS.map((path) => (
        <path key={path} d={path} fill="currentColor" />
      ))}
      {MEDELA_TREFOIL_PATHS.map((path) => (
        <path key={path} d={path} fill={MEDELA_TREFOIL_FILL} />
      ))}
    </svg>
  );
}
