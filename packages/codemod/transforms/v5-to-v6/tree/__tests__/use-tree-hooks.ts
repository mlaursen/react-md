import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "use-tree-hooks", null, fixture, {
    parser: "tsx",
  });
};

test("SingleSelectTree");
test("DestructureHookValues");
test("ReferencingHookValues");
