import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-tree-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleTreeProps");
test("TreeItemRenderProps");
