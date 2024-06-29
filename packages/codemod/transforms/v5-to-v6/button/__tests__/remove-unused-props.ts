import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "remove-unused-props", null, fixture, {
    parser: "tsx",
  });
};

test("button-ripple-props");
