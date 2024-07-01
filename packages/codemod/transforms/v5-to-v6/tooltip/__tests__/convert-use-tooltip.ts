import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "convert-use-tooltip", null, fixture, {
    parser: "tsx",
  });
};

test("useTooltip");
test("useTooltipTypes");
test("useTooltipRemoved");
