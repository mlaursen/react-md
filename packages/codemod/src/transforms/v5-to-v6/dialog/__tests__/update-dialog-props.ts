import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-dialog-props", null, fixture, {
    parser: "tsx",
  });
};

test("Dialog");
test("FixedDialog");
