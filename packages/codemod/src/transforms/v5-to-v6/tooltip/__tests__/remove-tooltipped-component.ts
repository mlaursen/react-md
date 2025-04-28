import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-tooltipped-component", null, fixture, {
    parser: "tsx",
  });
};

test("Tooltipped");
test("TooltippedChildRenderer");
