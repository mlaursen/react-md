import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "rename-button-theme-class-names", null, fixture, {
    parser: "tsx",
  });
};

test("button-theme-class-names");
