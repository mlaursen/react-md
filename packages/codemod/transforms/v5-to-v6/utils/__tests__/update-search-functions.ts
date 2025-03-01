import { defineTest } from "jscodeshift/src/testUtils";

const test = (fixture: string): void => {
  defineTest(__dirname, "update-search-functions", null, fixture, {
    parser: "ts",
  });
};

test("caseInsensitiveFilter");
test("findIgnoreCase");
test("fuzzySearch");
