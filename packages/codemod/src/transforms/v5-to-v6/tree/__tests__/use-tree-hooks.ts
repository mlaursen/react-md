import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "use-tree-hooks", null, fixture, {
    parser: "tsx",
  });
};

test("SingleSelectTree");
test("DestructureHookValues");
test("ReferencingHookValues");
