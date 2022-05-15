import {
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_LEFT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  TOP_CENTER_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "../constants";
import { getTransformOrigin } from "../getTransformOrigin";

const TOP_LEFT = "0 0";
const TOP_CENTER = "50% 0";
const TOP_RIGHT = "100% 0";

const CENTER_LEFT = "0 50%";
const CENTER_CENTER = "50% 50%";
const CENTER_RIGHT = "100% 50%";

const BOTTOM_LEFT = "0 100%";
const BOTTOM_CENTER = "50% 100%";
const BOTTOM_RIGHT = "100% 100%";

describe("getTransformOrigin", () => {
  it('should position the "right below", "right top", "inner-left below", and "inner-left top" anchors to the top left origin', () => {
    expect(getTransformOrigin(BELOW_RIGHT_ANCHOR)).toBe(TOP_LEFT);
    expect(getTransformOrigin(TOP_RIGHT_ANCHOR)).toBe(TOP_LEFT);
    expect(getTransformOrigin(BELOW_INNER_LEFT_ANCHOR)).toBe(TOP_LEFT);
    expect(getTransformOrigin(TOP_INNER_LEFT_ANCHOR)).toBe(TOP_LEFT);
  });

  it('should position the "center below" and "center top" anchors to the top center origin ("50% 0")', () => {
    expect(getTransformOrigin(BELOW_CENTER_ANCHOR)).toBe(TOP_CENTER);
    expect(getTransformOrigin(TOP_CENTER_ANCHOR)).toBe(TOP_CENTER);
  });

  it('should position the "inner-right below", "inner-right top", "left below", and "left top" anchors to the top right origin ("100% 0")', () => {
    expect(getTransformOrigin(BELOW_INNER_RIGHT_ANCHOR)).toBe(TOP_RIGHT);
    expect(getTransformOrigin(TOP_INNER_RIGHT_ANCHOR)).toBe(TOP_RIGHT);
    expect(getTransformOrigin(BELOW_LEFT_ANCHOR)).toBe(TOP_RIGHT);
    expect(getTransformOrigin(TOP_LEFT_ANCHOR)).toBe(TOP_RIGHT);
  });

  it('should position the "right center" and "inner-right center" anchors to the center left origin ("0 50%")', () => {
    expect(getTransformOrigin(CENTER_RIGHT_ANCHOR)).toBe(CENTER_LEFT);
    expect(getTransformOrigin(CENTER_INNER_LEFT_ANCHOR)).toBe(CENTER_LEFT);
  });

  it('should position the "center center" anchor to the absolute center origin ("50% 50%")', () => {
    expect(getTransformOrigin(CENTER_CENTER_ANCHOR)).toBe(CENTER_CENTER);
  });

  it('should position the "inner-right center" and "left center" anchors to the center right origin ("100% 50%")', () => {
    expect(getTransformOrigin(CENTER_INNER_RIGHT_ANCHOR)).toBe(CENTER_RIGHT);
    expect(getTransformOrigin(CENTER_LEFT_ANCHOR)).toBe(CENTER_RIGHT);
  });

  it('should position the "right above", "right bottom", "inner-left above", and "inner-left bottom" anchors to the bottom left origin ("0 100%")', () => {
    expect(getTransformOrigin(ABOVE_RIGHT_ANCHOR)).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin(BOTTOM_RIGHT_ANCHOR)).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin(ABOVE_INNER_LEFT_ANCHOR)).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin(BOTTOM_INNER_LEFT_ANCHOR)).toBe(BOTTOM_LEFT);
  });

  it('should position the "center above" and "center bottom" anchors to the bottom center origin ("50% 100%")', () => {
    expect(getTransformOrigin(ABOVE_CENTER_ANCHOR)).toBe(BOTTOM_CENTER);
    expect(getTransformOrigin(BOTTOM_CENTER_ANCHOR)).toBe(BOTTOM_CENTER);
  });

  it('should position the "inner-right above", "inner-right bottom", "left above", and "left bottom" anchors to the bottom right origin ("100% 100%")', () => {
    expect(getTransformOrigin(ABOVE_INNER_RIGHT_ANCHOR)).toBe(BOTTOM_RIGHT);
    expect(getTransformOrigin(BOTTOM_INNER_RIGHT_ANCHOR)).toBe(BOTTOM_RIGHT);
    expect(getTransformOrigin(ABOVE_LEFT_ANCHOR)).toBe(BOTTOM_RIGHT);
    expect(getTransformOrigin(BOTTOM_LEFT_ANCHOR)).toBe(BOTTOM_RIGHT);
  });

  it("should default to 0 0 if an invalid anchor is provided", () => {
    // @ts-expect-error
    expect(getTransformOrigin({ x: "invalid", y: "invalid" })).toBe("0 0");
  });
});
