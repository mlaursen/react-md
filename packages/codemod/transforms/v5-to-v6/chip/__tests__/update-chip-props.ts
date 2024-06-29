import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-chip-props", null, fixture, {
    parser: "tsx",
  });
};

test("Chip");
