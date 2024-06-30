import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-table-cell-props", null, fixture, {
    parser: "tsx",
  });
};

test("ColSpan100");
test("DisableTableCellPadding");
