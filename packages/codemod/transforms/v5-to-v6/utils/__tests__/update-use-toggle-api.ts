import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-use-toggle-api", null, fixture, {
    parser: "tsx",
  });
};

test("UseToggleWorstCase");
