import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "use-panels-to-use-expansion-panels",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("SimpleExample");
test("ExpansionPanelConfiguringUsePanelsBehavior");
test("NonDestructuredArray");
test("SpreadResult");
test("ExpandedIds");
test("SetExpandedIds");
