import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-search-functions", null, fixture, {
    parser: "ts",
  });
};

test("caseInsensitiveFilter");
test("findIgnoreCase");
test("fuzzySearch");
