import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-slider-and-range-slider", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleSlider");
test("SimpleRangeSlider");
