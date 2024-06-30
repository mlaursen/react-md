import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-circular-progress-props", null, fixture, {
    parser: "tsx",
  });
};

test("CircularProgress");
