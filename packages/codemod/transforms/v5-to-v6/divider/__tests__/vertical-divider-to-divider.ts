import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "vertical-divider-to-divider", null, fixture, {
    parser: "tsx",
  });
};

test("VerticalDivider");
test("VerticalDividerWithProps");
test("RemovedStuff");
