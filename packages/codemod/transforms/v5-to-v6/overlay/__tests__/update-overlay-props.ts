import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-overlay-props", null, fixture, {
    parser: "tsx",
  });
};

test("Overlay");
