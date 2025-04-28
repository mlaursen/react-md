import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "to-symbol", null, fixture, {
    parser: "tsx",
  });
};

test("material-symbols");
test("material-symbol-only");
