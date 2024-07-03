import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-expansion-panel-props", null, fixture, {
    parser: "tsx",
  });
};

test("DeprecatedExpansionPanelProps");
test("HeaderMigration");
