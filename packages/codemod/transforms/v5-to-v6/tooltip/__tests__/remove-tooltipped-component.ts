import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-tooltipped-component", null, fixture, {
    parser: "tsx",
  });
};

test("Tooltipped");
test("TooltippedChildRenderer");
