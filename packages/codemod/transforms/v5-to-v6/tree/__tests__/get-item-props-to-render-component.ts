import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "get-item-props-to-render-component", null, fixture, {
    parser: "tsx",
  });
};

test("ConvertGetItemProps");
test("ConvertGetItemPropsDestructured");
