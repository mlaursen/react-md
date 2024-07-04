import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "item-renderer-to-render-component", null, fixture, {
    parser: "tsx",
  });
};

test("ConvertItemRenderer");
