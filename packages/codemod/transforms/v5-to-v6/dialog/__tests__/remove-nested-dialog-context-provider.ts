import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(
    __dirname,
    "remove-nested-dialog-context-provider",
    null,
    fixture,
    {
      parser: "tsx",
    }
  );
};

test("NestedDialogContextProvider");
test("NestedDialogContextProviderOnly");
