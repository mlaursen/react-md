import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-tooltip-props", null, fixture, {
    parser: "tsx",
  });
};

test("Tooltip");
