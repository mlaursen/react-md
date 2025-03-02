import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "replace-with-form-message-components", null, fixture, {
    parser: "tsx",
  });
};

test("WithMessageExamples");
