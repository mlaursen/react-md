import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-app-bar-props", null, fixture, {
    parser: "tsx",
  });
};

test("app-bar-props");
