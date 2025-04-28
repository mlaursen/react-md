import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "convert-use-tooltip", null, fixture, {
    parser: "tsx",
  });
};

test("useTooltip");
test("useTooltipTypes");
test("useTooltipRemoved");
