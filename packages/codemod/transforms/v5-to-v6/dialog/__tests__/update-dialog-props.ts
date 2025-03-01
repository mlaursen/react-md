import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-dialog-props", null, fixture, {
    parser: "tsx",
  });
};

test("Dialog");
test("FixedDialog");
