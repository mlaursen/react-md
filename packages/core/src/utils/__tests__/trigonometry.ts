import { describe, expect, it } from "vitest";

import { type Point } from "../../types.js";
import {
  calcHypotenuse,
  degreesToRadians,
  isPointInCircle,
  radiansToDegrees,
} from "../trigonometry.js";

describe("radiansToDegrees", () => {
  it("should convert 0 radians to 0 degrees", () => {
    expect(radiansToDegrees(0)).toBe(0);
  });

  it("should convert PI radians to 180 degrees", () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
  });

  it("should convert PI/2 radians to 90 degrees", () => {
    expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
  });
});

describe("degreesToRadians", () => {
  it("should convert 0 degrees to 0 radians", () => {
    expect(degreesToRadians(0)).toBe(0);
  });

  it("should convert 180 degrees to PI radians", () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
  });

  it("should convert 90 degrees to PI/2 radians", () => {
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
  });
});

describe("isPointInCircle", () => {
  const center: Point = { x: 0, y: 0 };
  it("should return true for a point at the center", () => {
    expect(isPointInCircle({ point: { x: 0, y: 0 }, center, radius: 1 })).toBe(
      true
    );
  });

  it("should return true for a point on the boundary", () => {
    expect(isPointInCircle({ point: { x: 1, y: 0 }, center, radius: 1 })).toBe(
      true
    );
  });

  it("should return false for a point outside the circle", () => {
    expect(isPointInCircle({ point: { x: 2, y: 0 }, center, radius: 1 })).toBe(
      false
    );
  });
});

describe("calcHypotenuse", () => {
  it("should return 0 for the origin", () => {
    expect(calcHypotenuse({ x: 0, y: 0 })).toBe(0);
  });

  it("should return 5 for (3, 4)", () => {
    expect(calcHypotenuse({ x: 3, y: 4 })).toBe(5);
  });

  it("should return correct value for negative coordinates", () => {
    expect(calcHypotenuse({ x: -3, y: -4 })).toBe(5);
  });
});
