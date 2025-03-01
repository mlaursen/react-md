import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-simple-props", null, fixture, {
    parser: "tsx",
  });
};

test("DefaultAutocomplete");
test("FuzzyAutocomplete");
test("InvalidAutocomplete");
test("CustomFilterFunction");
