import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "remove-deprecated-card-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleCard");
