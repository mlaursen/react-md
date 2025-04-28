import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "rename-unstyled-button", null, fixture, {
    parser: "tsx",
  });
};

test("unstyled-button");
test("aliased-unstyled-button");
test("aliased-unstyled-button-as-button-unstyled");
