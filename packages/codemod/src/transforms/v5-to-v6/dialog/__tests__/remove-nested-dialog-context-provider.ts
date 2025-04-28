import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(
    import.meta.url,
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
