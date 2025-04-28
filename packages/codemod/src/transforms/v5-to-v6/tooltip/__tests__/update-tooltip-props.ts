import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-tooltip-props", null, fixture, {
    parser: "tsx",
  });
};

test("Tooltip");
