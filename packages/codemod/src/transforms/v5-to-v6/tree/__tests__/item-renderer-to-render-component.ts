import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "item-renderer-to-render-component",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("ConvertItemRenderer");
