import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "vertical-divider-to-divider", null, fixture, {
    parser: "tsx",
  });
};

test("VerticalDivider");
test("VerticalDividerWithProps");
test("RemovedStuff");
