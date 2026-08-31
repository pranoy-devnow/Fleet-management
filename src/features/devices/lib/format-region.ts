/**
 * Turns a region slug (`north-america`) into title case (`North America`).
 */
export function formatRegionLabel(region: string): string {
  return region
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
