import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-use-text-field-api", null, fixture, {
    parser: "tsx",
  });
};

test("TextFieldHookExamples");
test("FullTextFieldHook");
test("TextFieldHookOptions");
test("NumberFieldHookOptions");
