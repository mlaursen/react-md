import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "rename-unstyled-button", null, fixture, {
    parser: "tsx",
  });
};

test("unstyled-button");
test("aliased-unstyled-button");
test("aliased-unstyled-button-as-button-unstyled");
