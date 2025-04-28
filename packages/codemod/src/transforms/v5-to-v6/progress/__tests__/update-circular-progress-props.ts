import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-circular-progress-props", null, fixture, {
    parser: "tsx",
  });
};

test("CircularProgress");
