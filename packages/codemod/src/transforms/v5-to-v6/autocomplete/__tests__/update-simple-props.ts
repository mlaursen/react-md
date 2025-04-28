import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-simple-props", null, fixture, {
    parser: "tsx",
  });
};

test("DefaultAutocomplete");
test("FuzzyAutocomplete");
test("InvalidAutocomplete");
test("CustomFilterFunction");
