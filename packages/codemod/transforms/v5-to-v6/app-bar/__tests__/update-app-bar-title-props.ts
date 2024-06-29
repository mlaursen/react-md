import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-app-bar-title-props", null, fixture, {
    parser: "tsx",
  });
};

test("app-bar-title-props");
