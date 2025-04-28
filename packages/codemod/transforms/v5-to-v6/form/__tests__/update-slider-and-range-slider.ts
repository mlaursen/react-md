import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-slider-and-range-slider", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleSlider");
test("SimpleRangeSlider");
