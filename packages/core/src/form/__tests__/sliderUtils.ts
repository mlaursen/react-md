import { describe, expect, it } from "@jest/globals";

import { getJumpValue, getThumbOffsets } from "../sliderUtils.js";

describe("getJumpValue", () => {
  it("should set the jump value to 1/10 of the range when the jump value is undefined", () => {
    expect(
      getJumpValue({
        min: 0,
        max: 100,
        step: 1,
        jump: undefined,
      })
    ).toBe(10);
    expect(
      getJumpValue({
        min: 0,
        max: 100,
        step: 10,
        jump: undefined,
      })
    ).toBe(10);
    expect(
      getJumpValue({
        min: 0,
        max: 50,
        step: 10,
        jump: undefined,
      })
    ).toBe(10);
  });

  it("should round up to the nearest step if 1/10 the range is less than a step", () => {
    expect(
      getJumpValue({
        min: 0,
        max: 50,
        step: 10,
        jump: undefined,
      })
    ).toBe(10);
  });

  it("should ensure the jump value is an integer if the step is an integer by rounding upward", () => {
    expect(
      getJumpValue({
        min: 0,
        max: 100,
        step: 1,
        jump: 12.3,
      })
    ).toBe(13);
    expect(
      getJumpValue({
        min: 0,
        max: 100,
        step: 1,
        jump: 15,
      })
    ).toBe(15);
    expect(
      getJumpValue({
        min: 0,
        max: 10,
        step: 0.25,
        jump: 0.125,
      })
    ).toBe(0.125);
    expect(
      getJumpValue({
        min: 0,
        max: 10,
        step: 0.25,
        jump: undefined,
      })
    ).toBe(1);
  });

  describe("getThumbOffsets", () => {
    it("should return undefined for the second thumb when acting as a single thumb slider", () => {
      expect(
        getThumbOffsets({
          min: 0,
          max: 100,
          thumb1Value: 30,
          isRangeSlider: false,
          thumb1Dragging: false,
          thumb1DragPercentage: 0.36,
          thumb2Dragging: false,
          thumb2Value: 100,
          thumb2DragPercentage: 100,
        })
      ).toEqual({
        "--rmd-slider-offset-1": "30%",
      });

      expect(
        getThumbOffsets({
          min: 0,
          max: 100,
          thumb1Value: 30,
          isRangeSlider: false,
          thumb1Dragging: true,
          thumb1DragPercentage: 0.36,
          thumb2Dragging: false,
          thumb2Value: 100,
          thumb2DragPercentage: 100,
        })
      ).toEqual({
        "--rmd-slider-offset-1": "36%",
      });
    });

    it("should return both offsets when acting as a range slider", () => {
      expect(
        getThumbOffsets({
          min: 0,
          max: 100,
          thumb1Value: 30,
          isRangeSlider: true,
          thumb1Dragging: false,
          thumb1DragPercentage: 0.36,
          thumb2Dragging: false,
          thumb2Value: 100,
          thumb2DragPercentage: 0.88,
        })
      ).toEqual({
        "--rmd-slider-offset-1": "30%",
        "--rmd-slider-offset-2": "100%",
      });

      expect(
        getThumbOffsets({
          min: 0,
          max: 100,
          thumb1Value: 30,
          isRangeSlider: true,
          thumb1Dragging: true,
          thumb1DragPercentage: 0.36,
          thumb2Dragging: false,
          thumb2Value: 100,
          thumb2DragPercentage: 0.88,
        })
      ).toEqual({
        "--rmd-slider-offset-1": "36%",
        "--rmd-slider-offset-2": "100%",
      });

      expect(
        getThumbOffsets({
          min: 0,
          max: 100,
          thumb1Value: 30,
          isRangeSlider: true,
          thumb1Dragging: false,
          thumb1DragPercentage: 0.36,
          thumb2Dragging: true,
          thumb2Value: 100,
          thumb2DragPercentage: 0.88,
        })
      ).toEqual({
        "--rmd-slider-offset-1": "30%",
        "--rmd-slider-offset-2": "88%",
      });
    });
  });
});
