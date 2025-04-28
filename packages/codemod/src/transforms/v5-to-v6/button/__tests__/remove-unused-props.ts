import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-unused-props", null, fixture, {
    parser: "tsx",
  });
};

test("button-ripple-props");
