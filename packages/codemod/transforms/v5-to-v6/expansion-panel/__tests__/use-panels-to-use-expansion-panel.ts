import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "use-panels-to-use-expansion-panels", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleExample");
test("ExpansionPanelConfiguringUsePanelsBehavior");
test("NonDestructuredArray");
test("SpreadResult");
test("ExpandedIds");
test("SetExpandedIds");
