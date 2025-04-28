import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
    "replace-with-form-message-components",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("WithMessageExamples");
