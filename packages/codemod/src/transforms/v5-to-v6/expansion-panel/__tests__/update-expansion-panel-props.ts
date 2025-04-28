import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-expansion-panel-props", null, fixture, {
    parser: "tsx",
  });
};

test("DeprecatedExpansionPanelProps");
test("HeaderMigration");
