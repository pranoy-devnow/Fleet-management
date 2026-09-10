/**
 * Microsoft's four-square mark for the SSO button.
 * Colours are the published brand squares, not Medela tokens.
 *
 * @param className - Size and spacing utilities for the SVG
 */
export function MicrosoftMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 21 21"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}
