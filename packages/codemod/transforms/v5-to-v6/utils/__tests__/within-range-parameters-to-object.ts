import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "within-range-parameters-to-object", null, fixture, {
    parser: "ts",
  });
};

test("withinRange");
