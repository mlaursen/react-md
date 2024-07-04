import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "everything", null, fixture, {
    parser: "tsx",
  });
};

test("CustomizingTreeItems");
