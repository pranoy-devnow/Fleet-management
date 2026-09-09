import {
  MEDELA_MARK_TRANSFORM,
  MEDELA_MARK_VIEW_BOX,
  MEDELA_TREFOIL_FILL,
  MEDELA_TREFOIL_PATHS,
} from "@/features/brand/lib/medela-artwork";
import { cn } from "@/lib/utils";

/**
 * Standalone official Medela trefoil.
 *
 * Decorative by default (`aria-hidden`): pair it with the visible "Medela"
 * wording, or use `MedelaLogo` when the mark is the only branding on screen.
 *
 * @param className - Sizing and colour classes; callers set the box size
 */
export function MedelaMark({ className }: { className?: string }) {
  const { width, height } = MEDELA_MARK_VIEW_BOX;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-9", className)}
    >
      <g transform={MEDELA_MARK_TRANSFORM} fill={MEDELA_TREFOIL_FILL}>
        {MEDELA_TREFOIL_PATHS.map((path) => (
          <path key={path} d={path} />
        ))}
      </g>
    </svg>
  );
}
