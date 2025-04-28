import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-table-cell-props", null, fixture, {
    parser: "tsx",
  });
};

test("ColSpan100");
test("DisableTableCellPadding");
