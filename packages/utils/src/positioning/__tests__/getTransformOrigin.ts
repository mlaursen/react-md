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
    expect(getTransformOrigin({ x: "right", y: "below" })).toBe(TOP_LEFT);
    expect(getTransformOrigin({ x: "right", y: "top" })).toBe(TOP_LEFT);
    expect(getTransformOrigin({ x: "inner-left", y: "below" })).toBe(TOP_LEFT);
    expect(getTransformOrigin({ x: "inner-left", y: "top" })).toBe(TOP_LEFT);
  });

  it('should position the "center below" and "center top" anchors to the top center origin ("50% 0")', () => {
    expect(getTransformOrigin({ x: "center", y: "below" })).toBe(TOP_CENTER);
    expect(getTransformOrigin({ x: "center", y: "top" })).toBe(TOP_CENTER);
  });

  it('should position the "inner-right below", "inner-right top", "left below", and "left top" anchors to the top right origin ("100% 0")', () => {
    expect(getTransformOrigin({ x: "inner-right", y: "below" })).toBe(
      TOP_RIGHT
    );
    expect(getTransformOrigin({ x: "inner-right", y: "top" })).toBe(TOP_RIGHT);
    expect(getTransformOrigin({ x: "left", y: "below" })).toBe(TOP_RIGHT);
    expect(getTransformOrigin({ x: "left", y: "top" })).toBe(TOP_RIGHT);
  });

  it('should position the "right center" and "inner-right center" anchors to the center left origin ("0 50%")', () => {
    expect(getTransformOrigin({ x: "right", y: "center" })).toBe(CENTER_LEFT);
    expect(getTransformOrigin({ x: "inner-left", y: "center" })).toBe(
      CENTER_LEFT
    );
  });

  it('should position the "center center" anchor to the absolute center origin ("50% 50%")', () => {
    expect(getTransformOrigin({ x: "center", y: "center" })).toBe(
      CENTER_CENTER
    );
  });

  it('should position the "inner-right center" and "left center" anchors to the center right origin ("100% 50%")', () => {
    expect(getTransformOrigin({ x: "inner-right", y: "center" })).toBe(
      CENTER_RIGHT
    );
    expect(getTransformOrigin({ x: "left", y: "center" })).toBe(CENTER_RIGHT);
  });

  it('should position the "right above", "right bottom", "inner-left above", and "inner-left bottom" anchors to the bottom left origin ("0 100%")', () => {
    expect(getTransformOrigin({ x: "right", y: "above" })).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin({ x: "right", y: "bottom" })).toBe(BOTTOM_LEFT);
    expect(getTransformOrigin({ x: "inner-left", y: "above" })).toBe(
      BOTTOM_LEFT
    );
    expect(getTransformOrigin({ x: "inner-left", y: "bottom" })).toBe(
      BOTTOM_LEFT
    );
  });

  it('should position the "center above" and "center bottom" anchors to the bottom center origin ("50% 100%")', () => {
    expect(getTransformOrigin({ x: "center", y: "above" })).toBe(BOTTOM_CENTER);
    expect(getTransformOrigin({ x: "center", y: "bottom" })).toBe(
      BOTTOM_CENTER
    );
  });

  it('should position the "inner-right above", "inner-right bottom", "left above", and "left bottom" anchors to the bottom right origin ("100% 100%")', () => {
    expect(getTransformOrigin({ x: "inner-right", y: "above" })).toBe(
      BOTTOM_RIGHT
    );
    expect(getTransformOrigin({ x: "inner-right", y: "bottom" })).toBe(
      BOTTOM_RIGHT
    );
    expect(getTransformOrigin({ x: "left", y: "above" })).toBe(BOTTOM_RIGHT);
    expect(getTransformOrigin({ x: "left", y: "bottom" })).toBe(BOTTOM_RIGHT);
  });
});
