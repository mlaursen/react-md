import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "get-item-props-to-render-component",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("ConvertGetItemProps");
test("ConvertGetItemPropsDestructured");
