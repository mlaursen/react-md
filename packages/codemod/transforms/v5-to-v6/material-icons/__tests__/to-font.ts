import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "to-font", null, fixture, {
    parser: "tsx",
  });
};

test("font-icons");
