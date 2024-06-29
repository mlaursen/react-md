import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "replace-nav-and-action-with-button", null, fixture, {
    parser: "tsx",
  });
};

test("simple-usage");
