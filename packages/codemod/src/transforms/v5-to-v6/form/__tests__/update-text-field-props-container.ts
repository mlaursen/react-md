import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "update-text-field-container-props",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("TextFieldContainerProps");
