import { describe, expect, it } from "vitest";

import { lonLatToXY } from "./map-projection";

describe("lonLatToXY", () => {
  it("maps the equator and prime meridian to the viewBox center", () => {
    expect(lonLatToXY(0, 0)).toEqual({ x: 1000, y: 500 });
  });

  it("maps the north pole to the top edge", () => {
    expect(lonLatToXY(0, 90)).toEqual({ x: 1000, y: 0 });
  });

  it("maps the antimeridian to the left and right edges", () => {
    expect(lonLatToXY(-180, 0).x).toBe(0);
    expect(lonLatToXY(180, 0).x).toBe(2000);
  });
});
