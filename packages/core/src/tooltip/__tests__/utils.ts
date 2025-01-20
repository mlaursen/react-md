import { describe, expect, it, jest } from "@jest/globals";

import {
  ABOVE_CENTER_ANCHOR,
  BELOW_CENTER_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
} from "../../positioning/constants.js";
import { DEFAULT_TOOLTIP_THRESHOLD } from "../constants.js";
import type { GetPositionOptions } from "../utils.js";
import { getAnchor, getPosition } from "../utils.js";

describe("getAnchor", () => {
  it("should return the correct PositionAnchor based on the SimplePosition", () => {
    expect(getAnchor("above")).toBe(ABOVE_CENTER_ANCHOR);
    expect(getAnchor("below")).toBe(BELOW_CENTER_ANCHOR);
    expect(getAnchor("left")).toBe(CENTER_LEFT_ANCHOR);
    expect(getAnchor("right")).toBe(CENTER_RIGHT_ANCHOR);
  });

  it("should throw an error if an invalid anchor is provided through javascript", () => {
    // @ts-expect-error
    expect(() => getAnchor("invalid")).toThrow(
      'Invalid tooltip position: "invalid"'
    );
  });
});

describe("getPosition", () => {
  it("should attempt to use the defaultPosition unless it can't fit within the viewport", () => {
    const vh = 768;
    const vw = 1024;
    expect(window.innerHeight).toBe(vh);
    expect(window.innerWidth).toBe(vw);

    const baseRect = document.body.getBoundingClientRect();
    const container = document.createElement("div");
    const rect = jest.spyOn(container, "getBoundingClientRect");

    const outOfBoundsVertical = vh * DEFAULT_TOOLTIP_THRESHOLD;
    const belowOptions: GetPositionOptions = {
      container,
      threshold: DEFAULT_TOOLTIP_THRESHOLD,
      defaultPosition: "below",
    };
    rect.mockReturnValue({ ...baseRect, top: vh / 2 });
    expect(getPosition(belowOptions)).toBe("below");

    rect.mockReturnValue({ ...baseRect, top: outOfBoundsVertical });
    expect(getPosition(belowOptions)).toBe("below");

    rect.mockReturnValue({ ...baseRect, top: outOfBoundsVertical + 1 });
    expect(getPosition(belowOptions)).toBe("above");

    const aboveOptions: GetPositionOptions = {
      ...belowOptions,
      defaultPosition: "above",
    };
    rect.mockReturnValue({ ...baseRect, top: vh / 2 });
    expect(getPosition(aboveOptions)).toBe("above");

    rect.mockReturnValue({ ...baseRect, top: vh - outOfBoundsVertical });
    expect(getPosition(aboveOptions)).toBe("above");

    rect.mockReturnValue({ ...baseRect, top: vh - outOfBoundsVertical - 1 });
    expect(getPosition(aboveOptions)).toBe("below");

    const outOfBoundsHorizontal = vw * DEFAULT_TOOLTIP_THRESHOLD;
    const leftOptions: GetPositionOptions = {
      ...belowOptions,
      defaultPosition: "left",
    };
    rect.mockReturnValue({ ...baseRect, left: vw / 2 });
    expect(getPosition(leftOptions)).toBe("left");

    rect.mockReturnValue({ ...baseRect, left: outOfBoundsHorizontal });
    expect(getPosition(leftOptions)).toBe("left");

    rect.mockReturnValue({ ...baseRect, left: vw - outOfBoundsHorizontal - 1 });
    expect(getPosition(leftOptions)).toBe("right");

    const rightOptions: GetPositionOptions = {
      ...belowOptions,
      defaultPosition: "right",
    };
    rect.mockReturnValue({ ...baseRect, left: vw / 2 });
    expect(getPosition(rightOptions)).toBe("right");

    rect.mockReturnValue({ ...baseRect, left: outOfBoundsHorizontal });
    expect(getPosition(rightOptions)).toBe("right");

    rect.mockReturnValue({ ...baseRect, left: outOfBoundsHorizontal + 1 });
    expect(getPosition(rightOptions)).toBe("left");
  });
});
