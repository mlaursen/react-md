import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-table-checkbox-props", null, fixture, {
    parser: "tsx",
  });
};

test("TableCheckbox");
