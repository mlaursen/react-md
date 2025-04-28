import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "to-font", null, fixture, {
    parser: "tsx",
  });
};

test("font-icons");
