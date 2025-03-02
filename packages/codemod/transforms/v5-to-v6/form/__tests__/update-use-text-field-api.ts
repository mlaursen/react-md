import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-use-text-field-api", null, fixture, {
    parser: "tsx",
  });
};

test("TextFieldHookExamples");
test("FullTextFieldHook");
test("TextFieldHookOptions");
test("NumberFieldHookOptions");
