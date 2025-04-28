import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-use-toggle-api", null, fixture, {
    parser: "tsx",
  });
};

test("useToggle");
test("UseToggleWorstCase");
