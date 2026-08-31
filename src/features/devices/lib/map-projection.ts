import { MAP_VIEWBOX } from "../constants";

/**
 * Projects geographic coordinates onto the fleet map's 2000×1000 viewBox
 * using an equirectangular projection.
 *
 * @param lon - Longitude in degrees (−180 to 180)
 * @param lat - Latitude in degrees (−90 to 90)
 * @returns Pixel coordinates in map viewBox space
 */
export function lonLatToXY(lon: number, lat: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * MAP_VIEWBOX.width,
    y: ((90 - lat) / 180) * MAP_VIEWBOX.height,
  };
}
